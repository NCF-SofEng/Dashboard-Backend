export interface Symbol {
    text: string;
    indices: number[];
}

export interface UserMention {
    screen_name: string;
    name: string;
    id: any;
    id_str: string;
    indices: number[];
}

export interface Url {
    url: string;
    expanded_url: string;
    display_url: string;
    indices: number[];
}

export interface Thumb {
    w: number;
    h: number;
    resize: string;
}

export interface Small {
    w: number;
    h: number;
    resize: string;
}

export interface Medium2 {
    w: number;
    h: number;
    resize: string;
}

export interface Large {
    w: number;
    h: number;
    resize: string;
}

export interface Sizes {
    thumb: Thumb;
    small: Small;
    medium: Medium2;
    large: Large;
}

export interface Medium {
    id: number;
    id_str: string;
    indices: number[];
    media_url: string;
    media_url_https: string;
    url: string;
    display_url: string;
    expanded_url: string;
    type: string;
    sizes: Sizes;
    source_status_id: number;
    source_status_id_str: string;
    source_user_id: number;
    source_user_id_str: string;
}

export interface Entities {
    hashtags: any[];
    symbols: Symbol[];
    user_mentions: UserMention[];
    urls: Url[];
    media: Medium[];
}

export interface Metadata {
    iso_language_code: string;
    result_type: string;
}

export interface Description {
    urls: any[];
}

export interface Url3 {
    url: string;
    expanded_url: string;
    display_url: string;
    indices: number[];
}

export interface Url2 {
    urls: Url3[];
}

export interface Entities2 {
    description: Description;
    url: Url2;
}

export interface User {
    id: any;
    id_str: string;
    name: string;
    screen_name: string;
    location: string;
    description: string;
    url: string;
    entities: Entities2;
    protected: boolean;
    followers_count: number;
    friends_count: number;
    listed_count: number;
    created_at: string;
    favourites_count: number;
    utc_offset?: any;
    time_zone?: any;
    geo_enabled: boolean;
    verified: boolean;
    statuses_count: number;
    lang?: any;
    contributors_enabled: boolean;
    is_translator: boolean;
    is_translation_enabled: boolean;
    profile_background_color: string;
    profile_background_image_url: string;
    profile_background_image_url_https: string;
    profile_background_tile: boolean;
    profile_image_url: string;
    profile_image_url_https: string;
    profile_banner_url: string;
    profile_link_color: string;
    profile_sidebar_border_color: string;
    profile_sidebar_fill_color: string;
    profile_text_color: string;
    profile_use_background_image: boolean;
    has_extended_profile: boolean;
    default_profile: boolean;
    default_profile_image: boolean;
    following?: any;
    follow_request_sent?: any;
    notifications?: any;
    translator_type: string;
    withheld_in_countries: any[];
}

export interface Symbol2 {
    text: string;
    indices: number[];
}

export interface UserMention2 {
    screen_name: string;
    name: string;
    id: any;
    id_str: string;
    indices: number[];
}

export interface Url4 {
    url: string;
    expanded_url: string;
    display_url: string;
    indices: number[];
}

export interface Thumb2 {
    w: number;
    h: number;
    resize: string;
}

export interface Small2 {
    w: number;
    h: number;
    resize: string;
}

export interface Medium4 {
    w: number;
    h: number;
    resize: string;
}

export interface Large2 {
    w: number;
    h: number;
    resize: string;
}

export interface Sizes2 {
    thumb: Thumb2;
    small: Small2;
    medium: Medium4;
    large: Large2;
}

export interface Medium3 {
    id: number;
    id_str: string;
    indices: number[];
    media_url: string;
    media_url_https: string;
    url: string;
    display_url: string;
    expanded_url: string;
    type: string;
    sizes: Sizes2;
}

export interface Entities3 {
    hashtags: any[];
    symbols: Symbol2[];
    user_mentions: UserMention2[];
    urls: Url4[];
    media: Medium3[];
}

export interface Metadata2 {
    iso_language_code: string;
    result_type: string;
}

export interface Url5 {
    url: string;
    expanded_url: string;
    display_url: string;
    indices: number[];
}

export interface Description2 {
    urls: Url5[];
}

export interface Url7 {
    url: string;
    expanded_url: string;
    display_url: string;
    indices: number[];
}

export interface Url6 {
    urls: Url7[];
}

export interface Entities4 {
    description: Description2;
    url: Url6;
}

export interface User2 {
    id: any;
    id_str: string;
    name: string;
    screen_name: string;
    location: string;
    description: string;
    url: string;
    entities: Entities4;
    protected: boolean;
    followers_count: number;
    friends_count: number;
    listed_count: number;
    created_at: string;
    favourites_count: number;
    utc_offset?: any;
    time_zone?: any;
    geo_enabled: boolean;
    verified: boolean;
    statuses_count: number;
    lang?: any;
    contributors_enabled: boolean;
    is_translator: boolean;
    is_translation_enabled: boolean;
    profile_background_color: string;
    profile_background_image_url: string;
    profile_background_image_url_https: string;
    profile_background_tile: boolean;
    profile_image_url: string;
    profile_image_url_https: string;
    profile_link_color: string;
    profile_sidebar_border_color: string;
    profile_sidebar_fill_color: string;
    profile_text_color: string;
    profile_use_background_image: boolean;
    has_extended_profile: boolean;
    default_profile: boolean;
    default_profile_image: boolean;
    following?: any;
    follow_request_sent?: any;
    notifications?: any;
    translator_type: string;
    withheld_in_countries: any[];
    profile_banner_url: string;
}

export interface BoundingBox {
    type: string;
    coordinates: number[][][];
}

export interface Attributes {
}

export interface Place {
    id: string;
    url: string;
    place_type: string;
    name: string;
    full_name: string;
    country_code: string;
    country: string;
    contained_within: any[];
    bounding_box: BoundingBox;
    attributes: Attributes;
}

export interface Thumb3 {
    w: number;
    h: number;
    resize: string;
}

export interface Small3 {
    w: number;
    h: number;
    resize: string;
}

export interface Medium6 {
    w: number;
    h: number;
    resize: string;
}

export interface Large3 {
    w: number;
    h: number;
    resize: string;
}

export interface Sizes3 {
    thumb: Thumb3;
    small: Small3;
    medium: Medium6;
    large: Large3;
}

export interface Medium5 {
    id: number;
    id_str: string;
    indices: number[];
    media_url: string;
    media_url_https: string;
    url: string;
    display_url: string;
    expanded_url: string;
    type: string;
    sizes: Sizes3;
}

export interface ExtendedEntities {
    media: Medium5[];
}

export interface Url8 {
    url: string;
    expanded_url: string;
    display_url: string;
    indices: number[];
}

export interface Entities5 {
    hashtags: any[];
    symbols: any[];
    user_mentions: any[];
    urls: Url8[];
}

export interface Metadata3 {
    iso_language_code: string;
    result_type: string;
}

export interface Url10 {
    url: string;
    expanded_url: string;
    display_url: string;
    indices: number[];
}

export interface Url9 {
    urls: Url10[];
}

export interface Url11 {
    url: string;
    expanded_url: string;
    display_url: string;
    indices: number[];
}

export interface Description3 {
    urls: Url11[];
}

export interface Entities6 {
    url: Url9;
    description: Description3;
}

export interface User3 {
    id: number;
    id_str: string;
    name: string;
    screen_name: string;
    location: string;
    description: string;
    url: string;
    entities: Entities6;
    protected: boolean;
    followers_count: number;
    friends_count: number;
    listed_count: number;
    created_at: string;
    favourites_count: number;
    utc_offset?: any;
    time_zone?: any;
    geo_enabled: boolean;
    verified: boolean;
    statuses_count: number;
    lang?: any;
    contributors_enabled: boolean;
    is_translator: boolean;
    is_translation_enabled: boolean;
    profile_background_color: string;
    profile_background_image_url: string;
    profile_background_image_url_https: string;
    profile_background_tile: boolean;
    profile_image_url: string;
    profile_image_url_https: string;
    profile_banner_url: string;
    profile_link_color: string;
    profile_sidebar_border_color: string;
    profile_sidebar_fill_color: string;
    profile_text_color: string;
    profile_use_background_image: boolean;
    has_extended_profile: boolean;
    default_profile: boolean;
    default_profile_image: boolean;
    following?: any;
    follow_request_sent?: any;
    notifications?: any;
    translator_type: string;
    withheld_in_countries: any[];
}

export interface QuotedStatus {
    created_at: string;
    id: number;
    id_str: string;
    text: string;
    truncated: boolean;
    entities: Entities5;
    metadata: Metadata3;
    source: string;
    in_reply_to_status_id?: any;
    in_reply_to_status_id_str?: any;
    in_reply_to_user_id?: any;
    in_reply_to_user_id_str?: any;
    in_reply_to_screen_name?: any;
    user: User3;
    geo?: any;
    coordinates?: any;
    place?: any;
    contributors?: any;
    is_quote_status: boolean;
    quoted_status_id: number;
    quoted_status_id_str: string;
    retweet_count: number;
    favorite_count: number;
    favorited: boolean;
    retweeted: boolean;
    possibly_sensitive: boolean;
    lang: string;
}

export interface RetweetedStatus {
    created_at: string;
    id: any;
    id_str: string;
    text: string;
    truncated: boolean;
    entities: Entities3;
    metadata: Metadata2;
    source: string;
    in_reply_to_status_id?: number;
    in_reply_to_status_id_str: string;
    in_reply_to_user_id?: number;
    in_reply_to_user_id_str: string;
    in_reply_to_screen_name: string;
    user: User2;
    geo?: any;
    coordinates?: any;
    place: Place;
    contributors?: any;
    is_quote_status: boolean;
    retweet_count: number;
    favorite_count: number;
    favorited: boolean;
    retweeted: boolean;
    possibly_sensitive: boolean;
    lang: string;
    extended_entities: ExtendedEntities;
    quoted_status_id?: number;
    quoted_status_id_str: string;
    quoted_status: QuotedStatus;
}

export interface Thumb4 {
    w: number;
    h: number;
    resize: string;
}

export interface Small4 {
    w: number;
    h: number;
    resize: string;
}

export interface Medium8 {
    w: number;
    h: number;
    resize: string;
}

export interface Large4 {
    w: number;
    h: number;
    resize: string;
}

export interface Sizes4 {
    thumb: Thumb4;
    small: Small4;
    medium: Medium8;
    large: Large4;
}

export interface Medium7 {
    id: number;
    id_str: string;
    indices: number[];
    media_url: string;
    media_url_https: string;
    url: string;
    display_url: string;
    expanded_url: string;
    type: string;
    sizes: Sizes4;
    source_status_id: number;
    source_status_id_str: string;
    source_user_id: number;
    source_user_id_str: string;
}

export interface ExtendedEntities2 {
    media: Medium7[];
}

export interface Status {
    created_at: string;
    id: any;
    id_str: string;
    text: string;
    truncated: boolean;
    entities: Entities;
    metadata: Metadata;
    source: string;
    in_reply_to_status_id?: number;
    in_reply_to_status_id_str: string;
    in_reply_to_user_id?: number;
    in_reply_to_user_id_str: string;
    in_reply_to_screen_name: string;
    user: User;
    geo?: any;
    coordinates?: any;
    place?: any;
    contributors?: any;
    retweeted_status: RetweetedStatus;
    is_quote_status: boolean;
    retweet_count: number;
    favorite_count: number;
    favorited: boolean;
    retweeted: boolean;
    lang: string;
    extended_entities: ExtendedEntities2;
    possibly_sensitive?: boolean;
    quoted_status_id?: number;
    quoted_status_id_str: string;
}

export interface SearchMetadata {
    completed_in: number;
    max_id: number;
    max_id_str: string;
    next_results: string;
    query: string;
    refresh_url: string;
    count: number;
    since_id: number;
    since_id_str: string;
}

export interface TwitterSearchResult {
    statuses: Status[];
    search_metadata: SearchMetadata;
}