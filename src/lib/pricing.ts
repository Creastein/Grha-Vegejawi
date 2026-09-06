export interface PricingData {
  weekdayPrice: number;
  weekendPrice: number;
  longWeekendPrice: number;
  monthlyPrice: number;
  promoBanner: string;
  isLiveFromSheet: boolean;
  lastChecked: string;
}

export const DEFAULT_PRICING: PricingData = {
  weekdayPrice: 165000,
  weekendPrice: 220000,
  longWeekendPrice: 250000,
  monthlyPrice: 1870000,
  promoBanner: 'Promo Reservasi Langsung — Tanpa Biaya Layanan OTA',
  isLiveFromSheet: false,
  lastChecked: new Date().toISOString()
};

export function formatRupiah(val: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(val);
}

export function formatRupiahSimple(val: number): string {
  return 'Rp ' + val.toLocaleString('id-ID');
}

export function formatRupiahShort(val: number): string {
  if (val >= 1000000) {
    const jt = val / 1000000;
    return jt % 1 === 0 ? `${jt}jt` : `${jt.toFixed(1).replace('.', ',')}jt`;
  }
  if (val >= 1000) {
    return `${Math.round(val / 1000)}rb`;
  }
  return val.toString();
}

function parseNumberFromCell(str: string, fallback: number): number {
  if (!str) return fallback;
  // Hapus karakter non-digit kecuali titik atau koma jika diperlukan
  const cleaned = str.replace(/[^0-9]/g, '');
  const parsed = parseInt(cleaned, 10);
  return isNaN(parsed) || parsed <= 0 ? fallback : parsed;
}

// In-memory cache for SSR runtime
let cachedPricing: PricingData | null = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 menit

export async function getPricing(): Promise<PricingData> {
  const now = Date.now();

  // Kembalikan cache jika masih valid
  if (cachedPricing && now - lastFetchTime < CACHE_TTL_MS) {
    return cachedPricing;
  }

  // Ambil URL dari environment variable
  const sheetCsvUrl = 
    (typeof process !== 'undefined' && process.env?.GOOGLE_SHEETS_CSV_URL) ||
    import.meta.env?.GOOGLE_SHEETS_CSV_URL ||
    '';

  if (!sheetCsvUrl) {
    return {
      ...DEFAULT_PRICING,
      lastChecked: new Date().toISOString()
    };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000); // 4 detik timeout

    const response = await fetch(sheetCsvUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'GrhaVegeJawi-AstroSSR/1.0'
      }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`[Google Sheets] Gagal fetch CSV (Status ${response.status}), menggunakan harga default.`);
      return cachedPricing || DEFAULT_PRICING;
    }

    const csvText = await response.text();
    const lines = csvText.split(/\r?\n/).filter(line => line.trim().length > 0);

    let weekday = DEFAULT_PRICING.weekdayPrice;
    let weekend = DEFAULT_PRICING.weekendPrice;
    let longWeekend = DEFAULT_PRICING.longWeekendPrice;
    let monthly = DEFAULT_PRICING.monthlyPrice;
    let promo = DEFAULT_PRICING.promoBanner;

    for (const line of lines) {
      // Split koma atau semicolon atau tab
      const parts = line.split(/[,;\t]/).map(p => p.replace(/^["']|["']$/g, '').trim());
      if (parts.length < 2) continue;

      const key = parts[0].toLowerCase();
      const val = parts[1];

      if (key.includes('weekday') || key.includes('senin') || key.includes('harian regular') || key.includes('reguler')) {
        weekday = parseNumberFromCell(val, weekday);
      } else if (key.includes('weekend') || key.includes('jumat') || key.includes('akhir pekan')) {
        weekend = parseNumberFromCell(val, weekend);
      } else if (key.includes('long weekend') || key.includes('libur') || key.includes('panjang')) {
        longWeekend = parseNumberFromCell(val, longWeekend);
      } else if (key.includes('bulan') || key.includes('bulanan') || key.includes('kost')) {
        monthly = parseNumberFromCell(val, monthly);
      } else if (key.includes('promo') || key.includes('banner') || key.includes('pengumuman')) {
        if (val && val.trim().length > 0) {
          promo = val.trim();
        }
      }
    }

    const result: PricingData = {
      weekdayPrice: weekday,
      weekendPrice: weekend,
      longWeekendPrice: longWeekend,
      monthlyPrice: monthly,
      promoBanner: promo,
      isLiveFromSheet: true,
      lastChecked: new Date().toISOString()
    };

    cachedPricing = result;
    lastFetchTime = now;
    return result;
  } catch (err) {
    console.error('[Google Sheets] Error membaca Google Sheets:', err);
    return cachedPricing || DEFAULT_PRICING;
  }
}
