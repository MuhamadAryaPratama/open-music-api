const autoBind = require("auto-bind");

class SongHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async postSongHandler(request, h) {
    this._validator.validateSongsPayload(request.payload);
    const { title, year, genre, performer, duration, albumId } =
      request.payload;

    const songId = await this._service.addSong({
      title,
      year,
      genre,
      performer,
      duration,
      albumId,
    });

    const response = h.response({
      status: "success",
      message: "Berhasil menambahkan lagu",
      data: {
        songId,
      },
    });
    response.code(201);
    return response;
  }

  async getSongsHandler(request, h) {
    const { title, performer } = request.query;
    const songs = await this._service.getAllSongs(title, performer);

    return h
      .response({
        status: "success",
        message: "Berhasil mendapatkan semua lagu",
        data: {
          songs,
        },
      })
      .code(200);
  }

  async getSongByIdHandler(request, h) {
    const { id } = request.params;
    const song = await this._service.getSongById(id);

    return h
      .response({
        status: "success",
        data: {
          song,
        },
      })
      .code(200);
  }

  async putSongByIdHandler(request, h) {
    this._validator.validateSongsPayload(request.payload);
    const { title, year, genre, performer, duration, albumId } =
      request.payload;
    const { id } = request.params;

    await this._service.editSongById(id, {
      title,
      year,
      genre,
      performer,
      duration,
      albumId,
    });
    return h
      .response({
        status: "success",
        message: "Lagu berhasil di update",
      })
      .code(200);
  }

  async deleteSongByIdHandler(request, h) {
    const { id } = request.params;
    await this._service.deleteSongById(id);

    return h
      .response({
        status: "success",
        message: "Lagu berhasil di hapus",
      })
      .code(200);
  }
}

module.exports = SongHandler;
