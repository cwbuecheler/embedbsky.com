import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

import { BskyItem, BskyItemPostRecord } from '@/types/bsky';
import classes from './PostItem.module.css';
import LikeSvg from './LikeSvg';
import MoreOptionsSvg from './MoreOptionsSvg';
import ReplySvg from './ReplySvg';
import RepostSvg from './RepostSvg';
import UserAvatarSvg from './UserAvatarSvg';

type PostItemProps = {
	item: BskyItem;
};

dayjs.updateLocale('en', {
	relativeTime: {
		future: 'in %s',
		past: '%s',
		s: 'a few seconds',
		m: '1min',
		mm: '%dmin',
		h: '1h',
		hh: '%dh',
		d: '1d',
		dd: '%dd',
		M: '1m',
		MM: '%dm',
		y: '1y',
		yy: '%dy',
	},
});

const generateBskyImage = (item: BskyItem): React.ReactElement | null => {
	// If there's a user image and no QP, show that
	const userImage = item?.post?.author?.avatar;
	if (userImage) {
		return (
			<img
				src={userImage}
				alt={`${item.post.author.displayname} avatar`}
				className={classes.postImage}
			/>
		);
	}

	// If there's a user image and it's a QP, show that
	const userImageQP = item?.post?.embed?.media?.images?.[0]?.thumb;
	if (userImageQP) {
		return (
			<img
				src={userImageQP}
				alt={item.post.embed.media.images[0].alt}
				className={classes.postImage}
			/>
		);
	}

	// If there's a reposted image, show that
	const repostedImage = item?.post?.embed?.images?.[0]?.thumb;
	if (repostedImage) {
		return (
			<img src={repostedImage} alt={item.post.embed.images[0].alt} className={classes.postImage} />
		);
	}
	return null;
};

const handleQuotePost = (record: BskyItemPostRecord): React.ReactElement | null => {
	if (record) {
		// This is a quote post so we need to format and display it
		// TODO - we need to move this out of PostItem and into a separate component
		// because a quote post contains a full separate Post Item
		// consider a TimeLineItem component that can call PostItem recursively
	}
	return null;
};

const PostItem: React.FC<PostItemProps> = (props) => {
	const { item } = props;

	const postCreatedAt = dayjs(item.post.record.createdAt);
	const postAgo = dayjs();

	const isRepost = item.reason ? true : false;
	const isQuote = item.post.embeds?.record ? true : false;

	return (
		<div className={classes.itemContainer}>
			{isRepost ? (
				<div className={classes.repostNotice}>
					<span className={classes.repostNoticeIcon}>
						<RepostSvg />
					</span>
					Reposted By {item.reason.by.displayName}
				</div>
			) : null}
			<div className={classes.contentWrap}>
				<div className={classes.avatar}>
					{item.post.author?.avatar ? (
						<img
							alt=""
							draggable="false"
							src={item.post.author.avatar}
							width={52}
							height={52}
							style={{ width: '52px', height: '52px', borderRadius: '26px' }}
						/>
					) : (
						<UserAvatarSvg />
					)}
				</div>

				<div className="contentContainer">
					<div className={classes.contentInfo}>
						<span className={classes.name}>
							<a href={`https://bsky.app/profile/${item.post.author.handle}`} target="_blank">
								{item.post.author.displayName}
							</a>
						</span>
						<span className={classes.handle}>
							<a href={`https://bsky.app/profile/${item.post.author.handle}`}>
								@{item.post.author.handle}
							</a>
						</span>
						&bull;{' '}
						<span className="timestamp">{dayjs().to(dayjs(item.post.record.createdAt))}</span>
					</div>
					<div className="content" style={{ whiteSpace: 'pre-wrap' }}>
						{item.post.record.text}
						{generateBskyImage(item)}
						{/*
						{handleQuotePost(item.post.embed.record.record)}
						*/}
					</div>
					<div className="tools">
						<ReplySvg /> <span className="replyCount">{item.post.replyCount}</span>
						<RepostSvg /> <span className="repostCount">{item.post.repostCount}</span>
						<LikeSvg /> <span className="likeCount">{item.post.likeCount}</span>
						<MoreOptionsSvg />
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostItem;
