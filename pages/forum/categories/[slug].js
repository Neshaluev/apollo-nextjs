import React from 'react';
import { useRouter } from 'next/router';
import { getDataFromTree } from '@apollo/react-ssr';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// import TablePagination from '@material-ui/core/TablePagination';

import ModalWindow from '@/components/shared/Modal';
import TopicForm from '@/components/forms/TopicForm';
import {
  useCreateTopic,
  useGetUser,
  useGetTopicsByCategory,
} from '@/apollo/actions';
import withApollo from '@/hoc/withApollo';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  topicTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
  },
  tableHead: {
    background: theme.palette.primary.main,
  },
  tableHeadRowItem: {
    color: '#fff',
  },
}));

const useInitialData = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { data: dataUser } = useGetUser();
  const { data: dataTopic } = useGetTopicsByCategory({
    variables: { category: slug },
  });
  console.log('dataTopic', dataTopic);
  const user = (dataUser && dataUser.user) || null;
  const topicsByCategory = (dataTopic && dataTopic.topicsByCategory) || [];

  return [slug, router, user, topicsByCategory];
};

// const usePagination = () => {
//   // Pagination
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };
//   return [page, rowsPerPage, handleChangePage, handleChangeRowsPerPage];
// };

const Topics = () => {
  const classes = useStyles();
  const [slug, router, user, topicsByCategory] = useInitialData();

  // Topic
  const [createTopic] = useCreateTopic();

  // Pagination
  //   const [
  //     page,
  //     rowsPerPage,
  //     handleChangePage,
  //     handleChangeRowsPerPage,
  //   ] = usePagination();

  // Modal
  const [flagModal, setFlagModal] = React.useState(false);

  const handleShowModal = () => {
    console.log('клик');
    setFlagModal(!flagModal);
  };

  // Modal Form
  const handleModalForm = async (topicData) => {
    topicData.forumCategory = slug;
    console.log('Modal Form Data', topicData);
    await createTopic({ variables: topicData }).then(() => {
      setFlagModal(!flagModal);
    });
  };

  const goToTopic = (slug) =>
    router.push('/forum/topics/[slug]', `/forum/topics/${slug}`);

  return (
    <>
      <div className="topic">
        <div className={classes.topicTitle}>
          <Typography variant="h2" component="h3">
            Topics
          </Typography>
          <Button
            disabled={!user}
            variant="outlined"
            color="primary"
            onClick={handleShowModal}
          >
            Create Topics
          </Button>
        </div>
        <div className="topic-table">
          <Paper>
            <TableContainer>
              <Table className={classes.table} aria-label="simple table">
                <TableHead className={classes.tableHead}>
                  <TableRow>
                    <TableCell className={classes.tableHeadRowItem}>
                      Topic
                    </TableCell>
                    <TableCell className={classes.tableHeadRowItem}>
                      Category
                    </TableCell>
                    <TableCell className={classes.tableHeadRowItem}>
                      Author
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topicsByCategory.map((topic) => (
                    <TableRow
                      style={{ cursor: 'pointer' }}
                      onClick={() => goToTopic(topic.slug)}
                      key={topic._id}
                    >
                      <TableCell component="th" scope="row">
                        {topic.title}
                      </TableCell>
                      <TableCell>{topic.forumCategory.title}</TableCell>
                      <TableCell>{topic.user.username}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {/* <TablePagination
                            rowsPerPageOptions={[5, 10, 20]}
                            component="div"
                            count={dataTopics.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        /> */}
            </TableContainer>
          </Paper>
        </div>
      </div>

      <ModalWindow
        handleModal={handleShowModal}
        flagModal={flagModal}
        title="Create Topic"
      >
        <TopicForm onSubmit={handleModalForm} />
      </ModalWindow>
    </>
  );
};

export default withApollo(Topics, { getDataFromTree });
