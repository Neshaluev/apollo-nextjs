import React from 'react';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import { getDataFromTree } from '@apollo/react-ssr';
import Pagination from '@material-ui/lab/Pagination';
import ModalWindow from '@/components/shared/Modal';
import CommentForm from '@/components/forms/CommentForm';
import CommentItem from '@/components/forum/CommentItem';
import { useRouter } from 'next/router';
import withApollo from '@/hoc/withApollo';
import {
  useGetTopicBySlug,
  useCreatePost,
  useGetPostsByTopic,
} from '@/apollo/actions';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  pagination: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  discussionWrapper: {
    textAlign: 'left',
    minWidth: '1200px',
  },
  discussionTitle: {
    marginTop: 20,
    marginBottom: 40,
    textAlign: 'left',
  },
  discussionMainPost: {
    display: 'flex',
    justifyContent: 'flex-start',
    backgroundColor: '#f0eded',
    boxShadow: '0px 0.5px 3px 1px rgba(34, 60, 80, 0.2) inset',
    paddingBottom: 40,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 2,
    '& > div': {
      padding: 10,
    },
  },
  discussionAction: {
    display: 'flex',
    justifyContent: 'space-between',
    // alignItems: 'flex-end',
    marginTop: 20,
    marginBottom: 40,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const useInitialData = (slug, pagination) => {
  const { data: dataTopic } = useGetTopicBySlug({ variables: { slug } });
  const { data: dataPosts } = useGetPostsByTopic({
    variables: { slug, ...pagination },
    pollInterval: 5000,
  });

  const topic = (dataTopic && dataTopic.topicBySlug) || {};
  const postData = (dataPosts && dataPosts.postsByTopic) || {};
  return [topic, postData];
};

const TopicPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const { slug, pageNum = 1, pageSize = 5 } = router.query;
  const [pagination, setPagination] = React.useState({
    pageNum: parseInt(pageNum, 10),
    pageSize: parseInt(pageSize, 10),
  });
  const [topic, postData] = useInitialData(slug, pagination);

  // pagination
  const sizePag = Math.ceil(postData?.count / pageSize) || 1;

  const handleChange = (event, value) => {
    console.log('Value pagination', value, event);

    router.push(
      '/forum/topics/[slug]',
      `/forum/topics/${slug}?pageNum=${value}&pageSize=${pageSize}`,
      { shallow: true },
    );
    setPagination({ pageSize: +pageSize, pageNum: +value });
  };

  // modal
  const [flagModal, setFlagModal] = React.useState(false);

  const handleShowModal = () => {
    setFlagModal(!flagModal);
  };

  // create post replay
  const [createPost] = useCreatePost();
  const [replyTo, setReplyTo] = React.useState(null);

  const handleReplayToPost = (post) => {
    setReplyTo(post);
    handleShowModal();
  };

  const handleCreatePost = async (reply) => {
    if (replyTo) {
      reply.parent = replyTo._id;
    }
    reply.topic = topic._id;

    await createPost({ variables: reply }).then(() => cleanup());
  };

  const cleanup = () => {
    handleShowModal();
    toast.success('Post has been created!', { autoClose: 2000 });
  };

  return (
    <>
      <section className={classes.discussionTitle}>
        <Typography variant="h2" componwnt="h3">
          Discussion
        </Typography>
      </section>
      <section className={classes.discussionWrapper}>
        <div className={classes.discussionMainPost}>
          <div>
            <Avatar
              alt="Remy Sharp"
              src="https://img.pngio.com/user-logos-user-logo-png-1920_1280.png"
              className={classes.large}
            />
          </div>
          <div>
            <Typography variant="h4" componwnt="h">
              {topic?.user?.username}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {topic.title}
            </Typography>
          </div>
        </div>
        <div className="list">
          {postData?.posts?.map((post) => (
            <CommentItem
              key={post._id}
              post={post}
              handleReplay={handleReplayToPost}
            />
          ))}
        </div>
        <Divider />
        <div className={classes.discussionAction}>
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={handleShowModal}
            >
              Create Comment
            </Button>
          </div>
          <div className="pagination">
            <div className={classes.pagination}>
              {/* <Typography>Page: {pageNum}</Typography> */}
              <Pagination
                size="small"
                count={sizePag}
                page={pagination.pageNum}
                onChange={handleChange}
                variant="outlined"
                shape="rounded"
              />
            </div>
          </div>
        </div>
      </section>

      <ModalWindow
        handleModal={handleShowModal}
        flagModal={flagModal}
        title="Create Comment"
      >
        <CommentForm onSubmit={handleCreatePost} />
      </ModalWindow>
    </>
  );
};

export default withApollo(TopicPage, { getDataFromTree });
