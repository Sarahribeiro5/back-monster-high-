import prisma from "../../prisma/prisma.js";

class PersonagemModel {
  // Obter todos os personagens
  async findAll() {
    const personagens = await prisma.personagem.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return personagens;
  }

  // Obter um personagem pelo ID
  async findById(id) {
    const personagem = await prisma.personagem.findUnique({
      where: {
        id: Number(id),
      },
    });

    return personagem;
  }

  // Criar um novo personagem
  async create(nome, idade, caracteristicas) {
    const newPersonagem = await prisma.personagem.create({
      data: {
        nome,
        idade,
        características: caracteristicas,
      },
    });

    return newPersonagem;
  }

  // Atualizar um personagem
  async update(id, nome, idade, caracteristicas) {
    const personagem = await this.findById(id);

    if (!personagem) {
      return null;
    }

    // Atualize o personagem existente com os novos dados
    const data = {};
    if (nome !== undefined) {
      data.nome = nome;
    }
    if (idade !== undefined) {
      data.idade = idade;
    }
    if (caracteristicas !== undefined) {
      data.características = caracteristicas;
    }

    const personagemUpdated = await prisma.personagem.update({
      where: {
        id: Number(id),
      },
      data,
    });

    return personagemUpdated;
  }

  // Remover um personagem
  async delete(id) {
    const personagem = await this.findById(id);

    if (!personagem) {
      return null;
    }

    await prisma.personagem.delete({
      where: {
        id: Number(id),
      },
    });

    return true;
  }
}

export default new PersonagemModel();