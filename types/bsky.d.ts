// Master BlueSky Item
export type BskyItem = {
	post: BksyItemPost;
	reason: BskyItemReason;
};

// The actual post being displayed (might be a repost, might be an original post)
export type BskyItemPost = {
	uri: string;
	cid: string;
	author: BskyItemPostAuthor;
	record: BskyItemPostRecord;
	embed: BskyItemPostEmbed;
	replyCount: number;
	repostCount: number;
	likeCount: number;
	indexedAt: string;
	viewer: BskyItemPostViewer;
	labels: string[];
};

export type BskyItemPostAuthor = {
	did: string;
	handle: string;
	displayName: string;
	avatar: string;
	viewer: BskyItemPostAuthorViewer;
	labels: string[];
};

export type BskyItemPostAuthorViewer = {
	muted: boolean;
	blockedBy: boolean;
	following: string;
};

export type BskyItemPostRecord = {
	$type: string;
	createdAt: string;
	embed: BskyItemPostRecordEmbed;
	facets: BskyItemPostRecordFacet[];
	langs: string[];
	text: string;
};

export type BskyItemPostRecordEmbed = {
	$type: string;
	images: BskyItemPostRecordEmbedImage[];
};

export type BskyItemPostRecordEmbedImage = {
	alt: string;
	aspectRatio: {
		height: number;
		width: number;
	};
	image: {
		$type: string;
		ref: {
			$link: string;
		};
		mimeType: string;
		size: number;
	};
};

export type BskyItemPostRecordFacet = {
	features: BskyItemPostRecordFacetFeature[];
	index: {
		byteEnd: number;
		byteStart: number;
	};
};

export type BskyItemPostRecordFacetFeature = {
	$type: string;
	uri: string;
};

export type BskyItemPostEmbed = {
	$type: string;
	images: BskyItemPostEmbedImage[];
};

export type BskyItemPostEmbedImage = {
	thumb: string;
	fullsize: string;
	alt: string;
	aspectRatio: {
		height: number;
		width: number;
	};
};

export type BskyItemPostViewer = {
	repost: string;
	like: string;
};

// The "reason" the post is being displayed (if it's a repost, this is the person who reposted it)
export type BskyItemReason = {
	$type: string;
	by: BskyItemReasonBy;
	indexedAt: string;
};

export type BskyItemReasonBy = {
	did: string;
	handle: string;
	displayName: string;
	avatar: string;
	viewer: BskyItemReasonByViewer;
	labels: string[];
};

export type BskyItemReasonByViewer = {
	muted: boolean;
	blockedBy: boolean;
};
