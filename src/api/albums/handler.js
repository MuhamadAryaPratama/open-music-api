const autoBind = require("auto-bind");

class AlbumHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async postAlbumHandler(request, h) {
    this._validator.validateAlbumsPayload(request.payload);
    const { name, year } = request.payload;

    const albumId = await this._service.addAlbum({ name, year });

    const response = h.response({
      status: "success",
      message: "Berhasil menambahkan album",
      data: {
        albumId,
      },
    });
    response.code(201);
    return response;
  }

  async getAlbumByIdHandler(request, h) {
    const { id } = request.params;
    const album = await this._service.getAlbumById(id);

    // Ensure the album includes songs as an array, even if empty
    const mappedAlbum = {
      id: album.id,
      name: album.name,
      year: album.year,
      songs: album.songs || [], // Ensuring songs is always an array
    };

    return h
      .response({
        status: "success",
        data: {
          album: mappedAlbum,
        },
      })
      .code(200);
  }

  async putAlbumByIdHandler(request, h) {
    this._validator.validateAlbumsPayload(request.payload);
    const { name, year } = request.payload;
    const { id } = request.params;

    await this._service.editAlbumById(id, { name, year });
    return h
      .response({
        status: "success",
        message: "Album berhasil di update",
      })
      .code(200);
  }

  async deleteAlbumByIdHandler(request, h) {
    const { id } = request.params;
    await this._service.deleteAlbumById(id);

    return h
      .response({
        status: "success",
        message: "Album berhasil di hapus",
      })
      .code(200);
  }
}

module.exports = AlbumHandler;
