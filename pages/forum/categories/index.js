import React from 'react'
import {useGetForumCategories, useCreateForumCategory} from '@/apollo/actions'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import withApollo from '@/hoc/withApollo';
import Link from 'next/Link';
import { getDataFromTree } from '@apollo/react-ssr';

import ModalWindow from '@/components/shared/Modal';
import ForumForm from '@/components/forms/ForumForm';

const useStyles = makeStyles((theme) => ({
        categoryTitle: {
            marginBottom: theme.spacing(3),
        },
        categoryControllers: {
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: theme.spacing(3),
        },
        categoryCard: {
            minWidth: 275,
        },
        categoryListCard: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: theme.spacing(2),
        },
        categoryCardAction: {
            justifyContent: 'flex-end',
        }, 
        categoryCardContent: {
            textAlign: 'left',
        },
    })
)


const ForumCategories = () => {
    const classes = useStyles();
    const {data} = useGetForumCategories();
    const forumCategories = (data && data.forumCategories) || []

    const [createForumCategory] = useCreateForumCategory()

    const handleCreateForumCategory = async (data) => {
        await createForumCategory({ variables: data })
            .then( () => {
                handleShowModal();
            })
    }

    // modal

    const [flagModal, setFlagModal] = React.useState(false)

    const handleShowModal = () => {
        setFlagModal(!flagModal)
    }

    return (
        <>
            <section className={classes.categoryTitle}>
                <Typography 
                    variant="h2"
                    componwnt="h3"
                >
                    Categories
                </Typography>
                { data && <div className={classes.categoryControllers}>
                    <Button 
                        onClick={handleShowModal}
                        variant="outlined" 
                        color="secondary"
                    >Create Category</Button>
                </div>}
            </section>
            <section className={classes.categoryListCard}>
                {
                    forumCategories.map( (data) => (
                        <Card key={data.slug} className={classes.categoryCard}>
                                <CardContent className={classes.categoryCardContent}>
                                    <Typography variant="h5" component="h2">
                                        {data.title}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        {data.subTitle}
                                    </Typography>
                                </CardContent>
                                <CardActions className={classes.categoryCardAction}>
                                    <Link
                                        href={'/forum/categories/[slug]'}
                                        as={`/forum/categories/${data.slug}`}
                                    >
                                        <Button size="small">Learn More</Button>
                                    </Link>
                                </CardActions>
                            
                        </Card>
                        )
                    )
                } 
            </section>
            <ModalWindow 
                handleModal={handleShowModal}
                flagModal={flagModal}
                title='Create Category'
            >
                <ForumForm 
                    onSubmit={handleCreateForumCategory}
                />
            </ModalWindow>
        </>
    )
}

export default withApollo(ForumCategories, { getDataFromTree });