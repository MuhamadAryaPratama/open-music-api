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
  album_id,
}) => ({
  id,
  title,
  year,
  genre,
  performer,
  duration: duration || null,
  albumId: album_id || null,
});

module.exports = { mapDbAlbumsToModel, mapDbSongsToModel };
