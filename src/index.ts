import {
  Site,
} from 'calibre';
import Page from 'calibre/src/api/page';
import SnapshotMetrics from 'calibre/src/api/snapshot-metrics';

export default async () => {
  try {
    const sites = await Site.list();
    for (const site of sites) {
      const pages = await Page.list({ site: site.slug });
      for (const page of pages) {
        const metrics = await SnapshotMetrics.pulse({
          site: site.slug,
          page: page.uuid,
          metrics: ['first-meaningful-paint'],
          durationInDays: 1,
        });
        page.metrics = metrics;
      }
      site.pages = pages
    }
    return sites;
  } catch (e) {
    console.error(e);
  }

}
