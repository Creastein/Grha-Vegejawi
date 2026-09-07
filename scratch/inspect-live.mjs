import https from 'https';

https.get('https://www.grhavegejawi.com', (res) => {
  console.log('Status:', res.statusCode);
  console.log('Headers:', res.headers);
  let html = '';
  res.on('data', c => html += c);
  res.on('end', () => {
    console.log('Total HTML size:', html.length, 'bytes');
    console.log('Has external CSS link:', html.includes('/_astro/') && html.includes('rel="stylesheet"'));
    const linkMatches = html.match(/<link[^>]+>/g) || [];
    console.log('Link tags count:', linkMatches.length);
    linkMatches.forEach(l => console.log('  ', l));
    
    // Check if Google Fonts has print swap or blocking
    const fontLinks = linkMatches.filter(l => l.includes('fonts.googleapis.com'));
    console.log('Font links in live:', fontLinks);

    // Check hero img
    const heroImgMatch = html.match(/<img[^>]+hero[^>]*>/);
    console.log('Hero img in live:', heroImgMatch ? heroImgMatch[0] : 'not found');
  });
}).on('error', console.error);
