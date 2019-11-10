export class PlexAccount {
  id: number;

  thumb?: string;

  title?: string;
}

export class PlexServer {
  id: number;

  title?: string;

  uuid?: string;
}

export class PlexPlayer {
  id: number;

  local?: boolean;

  publicAddress?: string;

  title?: string;

  uuid?: string;
}

export class PlexMetadata {
  id: number;

  librarySectionType?: string;

  ratingKey?: string;

  key?: string;

  parentRatingKey?: string;

  grandparentRatingKey?: string;

  guid?: string;

  librarySectionID?: number;

  type?: string;

  title?: string;

  grandparentKey?: string;

  parentKey?: string;

  grandparentTitle?: string;

  parentTitle?: string;

  summary?: string;

  index?: number;

  parentIndex?: number;

  ratingCount?: number;

  thumb?: string;

  art?: string;

  parentThumb?: string;

  grandparentThumb?: string;

  grandparentArt?: string;

  addedAt?: number;

  updatedAt?: number;
}

export class PlexWebhook {
  id: number;

  event: string;

  user: boolean;

  owner: boolean;

  account: PlexAccount;

  server: PlexServer;

  player: PlexPlayer;

  metadata: PlexMetadata;
}
