import {
  Site,
  Snapshot,
} from 'calibre';
import Page from 'calibre/src/api/page';

export default async () => {
  try {
    const sites = await Site.list();
    for (const site of sites) {
      const [snapshots, pages] = await Promise.all([
        Snapshot.list({ site: site.slug}),
        Page.list({ site: site.slug }),
      ]);
      site.pages = pages;
      site.snapshots = snapshots;
    }
    return sites;
  } catch (e) {
    console.error(e);
  }

}
