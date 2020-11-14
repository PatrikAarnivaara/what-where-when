import useStyles from "./useStyles"


const PredictionListItem = ({title, prediction, date, url}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
          <ListSubheader component="div">December</ListSubheader>
        </GridListTile>
        {tileData.map((tile) => (
          <GridListTile key={tile.img}>
            <img src={url} alt={title} />
            <GridListTileBar
              title={title}
              subtitle={<span>by: {prediction}</span>}
              actionIcon={
                <IconButton
                  aria-label={`info about ${title}`}
                  className={classes.icon}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default PredictionListItem;
