const mapDbAlbumsToModel = ({ id, name, year }) => ({
  id,
  name,
  year,
});

const mapDbSongsToModel = ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId,
}) => ({
  id,
  title,
  year,
  genre,
  performer,
  duration: duration || null,
  albumId: albumId || null,
});

module.exports = { mapDbAlbumsToModel, mapDbSongsToModel };
