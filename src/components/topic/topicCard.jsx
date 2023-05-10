import { Card, CardHeader, CardContent, Typography, Avatar } from "@material-ui/core";
import useStyles from '../styles/TopicStyles/TopicCardStyles';
  const TopicCard = ({ topic, followersCount }) => {
    const classes = useStyles();
  
    return (
      <Card className={classes.root}>
        <CardContent>
          <Typography style={{float:'right'}} variant="body2" color="textSecondary" component="p">
            {followersCount} followers
          </Typography>
          <CardHeader
            avatar={<Avatar className={classes.avatar} variant="square" alt={topic.title} src={topic.topicPicture} />}
            title={<Typography className={classes.title} variant="h5" component="h2">{topic.title}</Typography>}
          />
          <Typography variant="body2" color="textSecondary" component="p">
            {topic.description}
          </Typography>
        </CardContent>
      </Card>
    );
  };
  

export default TopicCard;
