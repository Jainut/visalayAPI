import { PrismaClient } from '@prisma/client'; // Importando o Prisma Client pra falar com o banco de dados
import express from 'express'; // Importando a tal da bibliotaca principal

const router = express.Router(); // Usando só o básico pra criar rota mesmo
const prisma = new PrismaClient(); // Criando uma instância do Prisma Client pra usar depois

router.post('/registrar/Emprestimo', async (req, res) => { // Rota pra registrar empréstimo usando postzão
  const emprestimo = req.body;

  try { // Vai tentar, se der ruim, cai no catch
    const newEmprestimo = await prisma.emprestimo.create({ // Olha que maravilha a API mandando só o basico fi
      data: {
      operador_cpf: emprestimo.operador_cpf,
      ferramenta_id: emprestimo.ferramenta_id,
      status: 'Emprestado', // Aqui a gente já marca como emprestado, porque é isso que tá acontecendo
      }
    });

    return res.status(201).json({message: 'Empréstimo registrado com sucesso'});
  } catch (error) { // Caiu no catch, deu ruim, se deu ruim vai logar o erro e mandar resposta de erro
    console.error('Erro ao registrar empréstimo:', error);
    res.status(500).json({ message: 'Erro ao registrar empréstimo' });
  }
});

router.post('/registrar/Devolucao', async (req, res) => {
  const devolucao = req.body;

  try { // Vai tentar, se der ruim, cai no catch
    const newDevolucao = await prisma.devolucao.create({
      data: {
      operador_cpf: devolucao.operador_cpf,
      emprestimo_id: devolucao.emprestimo_id,
      ferramenta_id: devolucao.ferramenta_id,
      status: 'Devolvido', // Aqui a gente já marca como devolvido, porque é isso que tá acontecendo
      }
    });

    return res.status(201).json({message: 'Devolução registrada com sucesso'});
  } catch (error) { // Caiu no catch, deu ruim, se deu ruim vai logar o erro e mandar resposta de erro
    console.error('Erro ao registrar devolução:', error);
    res.status(500).json({ message: 'Erro ao registrar devolução' });
  }
}); /* OBS: Essa rota vai ser igual a de empréstimo porque tem que passar as mesmas infos. Provavelmente o resto do trabalho vai ficar todo pra quem fizer o DB,
    mas isso é com eles, eu só faço a API, então tá tudo certo */

export default router; // Exportando as rotas, porque nós precisa usar depois

// OBS: Mais umas 200 linhas eu não vou mais tar entendo como essa bomba tá rodando