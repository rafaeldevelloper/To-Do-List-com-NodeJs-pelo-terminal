import inquirer from 'inquirer';

let tarefas = [];

async function mainMenu() {
  const { opcao } = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcao',
      message: 'Escolha uma opção:',
      choices: [
        '📋 Listar tarefas',
        '➕ Adicionar tarefa',
        '✅ Marcar como concluída',
        '❌ Remover tarefa',
        '🚪 Sair'
      ]
    }
  ]);

  switch (opcao) {
    case '📋 Listar tarefas':
      listarTarefas();
      break;
    case '➕ Adicionar tarefa':
      await adicionarTarefa();
      break;
    case '✅ Marcar como concluída':
      await concluirTarefa();
      break;
    case '❌ Remover tarefa':
      await removerTarefa();
      break;
    case '🚪 Sair':
      console.log('Até mais!');
      process.exit();
  }

  await mainMenu();
}

function listarTarefas() {
  console.log('\nTAREFAS:');
  if (tarefas.length === 0) {
    console.log('Nenhuma tarefa encontrada.');
  } else {
    tarefas.forEach((t, i) => {
      const status = t.concluida ? '✅' : '⬜'; // ✅ para concluída, ⬜ para pendente
      console.log(`${i + 1}. ${status} ${t.nome}`);
    });
  }
  console.log('');
}

async function adicionarTarefa() {
  const { nome } = await inquirer.prompt([
    {
      type: 'input',
      name: 'nome',
      message: 'Digite o nome da tarefa:'
    }
  ]);

  tarefas.push({ nome, concluida: false });
  console.log('Tarefa adicionada!');
}

async function concluirTarefa() {
  if (tarefas.length === 0) {
    console.log('Sem tarefas para concluir.');
    return;
  }

  const { selecionadas } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'selecionadas',
      message: 'Selecione as tarefas concluídas:',
      choices: tarefas.map((t, i) => ({
        name: t.nome,
        value: i,
        checked: t.concluida
      }))
    }
  ]);

  tarefas.forEach((_, i) => {
    tarefas[i].concluida = selecionadas.includes(i);
  });

  console.log('Tarefas atualizadas!');
}

async function removerTarefa() {
  if (tarefas.length === 0) {
    console.log('Sem tarefas para remover.');
    return;
  }

  const { index } = await inquirer.prompt([
    {
      type: 'list',
      name: 'index',
      message: 'Selecione a tarefa para remover:',
      choices: tarefas.map((t, i) => ({
        name: `${t.concluida ? '[✔]' : '[ ]'} ${t.nome}`,
        value: i
      }))
    }
  ]);

  tarefas.splice(index, 1);
  console.log('Tarefa removida!');
}

// Iniciar app
mainMenu();