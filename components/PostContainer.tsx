import PostItem from './PostItem';
import classes from './PostContainer.module.css';

type PostContainerProps = {
	feed: any;
};

const postContainer: React.FC<PostContainerProps> = (props) => {
	const { feed } = props;

	const renderPostItems = () =>
		feed.map((item: any) => <PostItem item={item} key={item.post.cid} />);

	if (!feed) {
		return null;
	}

	return <div className={classes.postContainer}>{renderPostItems()}</div>;
};

export default postContainer;
