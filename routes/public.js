import express from 'express'; // Importando a tal da bibliotaca principal

const router = express.Router(); // Usando só o básico pra criar rota mesmo

router.post('/registrarEmprestimo', async (req, res) => { // Rota pra registrar empréstimo usando postzão
  const emprestimo = req.body;

  try { // Vai tentar, se der ruim, cai no catch
    const newEmprestimo = await prisma.emprestimo.create({ // Olha que maravilha a API mandando só o basico fi
      id: emprestimo.id,
      ferramenta: emprestimo.ferramenta,
      operador: emprestimo.operador,
    });

    return res.status(201).json({message: 'Empréstimo registrado com sucesso'});
  } catch (error) { // Caiu no catch, deu ruim, se deu ruim vai logar o erro e mandar resposta de erro
    console.error('Erro ao registrar empréstimo:', error);
    res.status(500).json({ message: 'Erro ao registrar empréstimo' });
  }
});

router.post('/registrarDevolucao', async (req, res) => {
  const devolucao = req.body;

  try { // Vai tentar, se der ruim, cai no catch
    const newDevolucao = await prisma.emprestimo.create({
      id: devolucao.id,
      ferramenta: devolucao.ferramenta,
      operador: devolucao.operador,
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