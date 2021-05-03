import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Divider from '@material-ui/core/Divider'
import { formatDate } from '@/helpers';

const PortfolioCard = ({ classes, portfolio }) => (
    <Card className={classes.sectionCard}>
        <CardContent className={classes.sectionCardContent}>
            <Typography variant="h5" component="h2">
                {portfolio.title}
            </Typography>
            <Typography color="textSecondary">
                {portfolio.jobTitle}
            </Typography>
            <Typography variant="body2" component="p" gutterBottom>
               {portfolio.description}
            </Typography>
            
        </CardContent>
            <Divider />
            <Typography 
                variant="caption" 
                component="p"
                className={classes.sectionCardAccent}
            >
                {formatDate(portfolio.startDate)} - {(portfolio.endDate && formatDate(portfolio.endDate)) || 'Present'}
            </Typography>
    </Card>
)

export default PortfolioCard;