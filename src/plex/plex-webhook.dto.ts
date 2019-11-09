import { Type } from 'class-transformer';

export class PlexAccount {
  readonly id?: number;
  readonly thumb?: string;
  readonly title?: string;
}

export class PlexServer {
  readonly title?: string;
  readonly uuid?: string;
}

export class PlexPlayer {
  readonly local?: boolean;
  readonly publicAddress?: string;
  readonly title?: string;
  readonly uuid?: string;
}

export class PlexMetadata {
  readonly librarySectionType?: string;
  readonly ratingKey?: string;
  readonly key?: string;
  readonly parentRatingKey?: string;
  readonly grandparentRatingKey?: string;
  readonly guid?: string;
  readonly librarySectionID?: number;
  readonly type?: string;
  readonly title?: string;
  readonly grandparentKey?: string;
  readonly parentKey?: string;
  readonly grandparentTitle?: string;
  readonly parentTitle?: string;
  readonly summary?: string;
  readonly index?: number;
  readonly parentIndex?: number;
  readonly ratingCount?: number;
  readonly thumb?: string;
  readonly art?: string;
  readonly parentThumb?: string;
  readonly grandparentThumb?: string;
  readonly grandparentArt?: string;
  readonly addedAt?: number;
  readonly updatedAt?: number;
}

export class PlexWebhookDto {
  readonly event: string;
  readonly user?: boolean;
  readonly owner?: boolean;

  @Type(() => PlexAccount)
  readonly Account?: PlexAccount;

  @Type(() => PlexServer)
  readonly Server?: PlexServer;

  @Type(() => PlexPlayer)
  readonly Player?: PlexPlayer;

  @Type(() => PlexMetadata)
  readonly Metadata?: PlexMetadata;
}
