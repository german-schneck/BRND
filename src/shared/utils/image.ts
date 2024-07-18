export function isImage(url: string): boolean {
  if (url === undefined || url === '') return false;
  if (url.includes('https://frames.neynar.com')) return false;
  if (url.includes('https://x.com')) return false;
  if (url.includes('frames.airstack.xyz')) return false;
  if (url.includes('hypersub.withfabric.xyz')) return false;
  if (url.includes('https://wallet.coinbase.com')) return false;
  if (url.includes('https://frames.tasseo.xyz')) return false;
  if (url.includes('https://www.bountycaster.xyz')) return false;
  if (url.includes('https://link.alfafrens.com')) return false;
  if (url.includes('https://events.xyz')) return false;
  if (url.includes('https://zora.co/collect')) return false;
  if (url.includes('https://talentprotocol.pages.dev')) return false;
  if (url.includes('https://www.talent-passport.xyz')) return false;
  if (url.includes('https://app.layer3.xyz')) return false;
  if (url.includes('https://www.frameboard.com')) return false;
  if (url.includes('https://perl.xyz')) return false;
  if (url.endsWith('.dev')) return false;
  if (url.endsWith('.dev/')) return false;

  return true;
}
