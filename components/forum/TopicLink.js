import { fromNow, shortify } from '@/helpers';
import Link from 'next/link';
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Divider from '@material-ui/core/Divider'

const TopicLink = ({classes, topic}) =>
  <Link
    href="/forum/topics/[slug]"
    as={`/forum/topics/${topic.slug}`}
  >
  <Card className={classes.sectionCard}>
      <CardContent className={classes.sectionCardContent}>
        <Typography variant="h5" component="h2">
            {topic.title}
        </Typography>
        <Typography color="textSecondary">
            {shortify(topic.content)}
        </Typography>
    </CardContent>
    <Divider />
    <Typography 
        variant="caption" 
        component="p"
        className={classes.sectionCardAccent}
    >
        Author: {topic.user.username}
        <br />
        {fromNow(topic.createdAt)}
    </Typography>
    </Card>
  </Link>

export default TopicLink;
