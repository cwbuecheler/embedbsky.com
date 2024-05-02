import { BskyItem } from '@/types/bsky';
import LikeSvg from './likeSvg';
import MoreOptionsSvg from './MoreOptionsSvg';
import ReplySvg from './replySvg';
import RepostSvg from './RepostSvg';

type PostItemProps = {
	item: BskyItem;
};

const PostItem: React.FC<PostItemProps> = (props) => {
	const { item } = props;

	return (
		<div
			className="itemContainer"
			style={{ border: '1px solid #AAAAAA', padding: '20px', margin: '10px', maxWidth: '600px' }}
		>
			{item.reason ? (
				<div className="repostNotice">Reposted By {item.reason.by.displayName}</div>
			) : null}
			<div className="avatar">
				<img
					alt=""
					draggable="false"
					src={item.post.author.avatar}
					width={52}
					height={52}
					style={{ width: '52px', height: '52px', borderRadius: '26px' }}
				/>
			</div>
			<div className="contentContainer">
				<div className="contentInfo">
					<span className="name">
						<a href={`https://bsky.app/profile/${item.post.author.handle}`} target="_blank">
							{item.post.author.displayName}
						</a>
					</span>
					<span className="handle">@{item.post.author.handle}</span> &bull;
					<span className="timestamp">{item.post.record.createdAt}</span>
				</div>
				<div className="content">{item.post.record.text}</div>
				<div className="tools">
					<ReplySvg /> <span className="replyCount">{item.post.replyCount}</span>
					<RepostSvg /> <span className="repostCount">{item.post.repostCount}</span>
					<LikeSvg /> <span className="likeCount">{item.post.likeCount}</span>
					<MoreOptionsSvg />
				</div>
			</div>
		</div>
	);
};

export default PostItem;
