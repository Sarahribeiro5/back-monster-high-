import prisma from "../../prisma/prisma.js";

class FilmeModel {
  // Obter todos os filmes
  async findAll() {
    const filmes = await prisma.filme.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return filmes;
  }

  // Obter um filme pelo ID
  async findById(id) {
    const filme = await prisma.filme.findUnique({
      where: {
        id: Number(id),
      },
    });

    return filme;
  }

  // Criar um novo filme
  async create(titulo, sinopse, personagensPrincipais, dataLancamento) {
    const novoFilme = await prisma.filme.create({
      data: {
        titulo,
        sinopse,
        personagensPrincipais,
        dataLancamento,
      },
    });

    return novoFilme;
  }

  // Atualizar um filme
  async update(id, titulo, sinopse, personagensPrincipais, dataLancamento) {
    const filme = await this.findById(id);

    if (!filme) {
      return null;
    }

    // Atualize o filme existente com os novos dados
    const data = {};
    if (titulo !== undefined) {
      data.titulo = titulo;
    }
    if (sinopse !== undefined) {
      data.sinopse = sinopse;
    }
    if (personagensPrincipais !== undefined) {
      data.personagensPrincipais = personagensPrincipais;
    }
    if (dataLancamento !== undefined) {
      data.dataLancamento = dataLancamento;
    }

    const filmeAtualizado = await prisma.filme.update({
      where: {
        id: Number(id),
      },
      data,
    });

    return filmeAtualizado;
  }

  // Remover um filme
  async delete(id) {
    const filme = await this.findById(id);

    if (!filme) {
      return null;
    }

    await prisma.filme.delete({
      where: {
        id: Number(id),
      },
    });

    return true;
  }
}

export default new FilmeModel();