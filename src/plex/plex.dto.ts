export class PlexAccountDto {
  readonly id?: number;
  readonly thumb?: string;
  readonly title?: string;
}

export class PlexServerDto {
  readonly title?: string;
  readonly uuid?: string;
}

export class PlexPlayerDto {
  readonly local?: boolean;
  readonly publicAddress?: string;
  readonly title?: string;
  readonly uuid?: string;
}

export class PlexMetadataDto {
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

  readonly Account?: PlexAccountDto;

  readonly Server?: PlexServerDto;

  readonly Player?: PlexPlayerDto;

  readonly Metadata?: PlexMetadataDto;
}
