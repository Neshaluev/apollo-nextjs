import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
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
        }
    },
    discussionComment: {
        display: 'flex',
        padding: 10,
        marginTop: 10,
        backgroundColor: 'white',
        boxShadow: '0px 0.5px 3px 1px rgba(34, 60, 80, 0.2) inset',
        '& > div': {
            padding: 10,
        }
    },
    discussionCommentContent: {
        width: '100%',
        '& > div': {
            marginTop: 10,
        }
    },
    discussionCommentReplay: {
        padding: 10,
        backgroundColor: 'gray',
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
}) )

const CommentItem = ({ post, handleReplay }) => {
    const classes = useStyles();

    return (
        <div className={classes.discussionComment}>
        <div>
            <Avatar 
                alt="Remy Sharp" 
                src="https://img.pngio.com/user-logos-user-logo-png-1920_1280.png" 
                className={classes.large} 
            />
        </div>
        <div className={classes.discussionCommentContent}>
            <div>
                <Typography 
                    variant="h5"
                    componwnt="h6"
                >
                     {post?.user?.username}
                </Typography>
            </div>

            {post?.parent && <div className={classes.discussionMainPost}>
                <div>
                    <Avatar 
                        alt="Remy Sharp" 
                        src="https://img.pngio.com/user-logos-user-logo-png-1920_1280.png" 
                        className={classes.large} 
                    />
                </div>
                <div>
                    <Typography 
                        variant="h5"
                        componwnt="h6"
                    >
                        {post?.parent?.user?.username}
                    </Typography>
                    <p>{post?.parent?.content}</p>
                </div>
            </div>}

            <div>
                <Typography variant="body1" gutterBottom>
                       {post?.content}
                </Typography>
            </div>
            <a 
                style={{ display: 'block', textAlign: 'right', color: '#000', cursor: 'pointer' }} 
                onClick={() => handleReplay(post)}
                >replay</a>
        </div>
    </div>
    )
}

export default  CommentItem