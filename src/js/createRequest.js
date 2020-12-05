// import buttonHandler from './buttonHandler';

const tickets = document.querySelector('.tickets');

const addTicketBtn = document.querySelector('.add-ticket-btn');

const body = document.querySelector('body');

function getDisable() {
  Array.from(document.querySelectorAll('.btn')).forEach((element) => {
    const button = element;
    button.disabled = true;
    button.style.pointerEvents = 'none';
  });
}

function setDisable() {
  Array.from(document.querySelectorAll('.btn')).forEach((element) => {
    const button = element;
    button.disabled = false;
    button.style.pointerEvents = 'auto';
  });
}

function request(method, data, target) {
  createRequest(method, data, target);
}

function confirm(target) {
  const addTicketForm = document.createElement('div');
  addTicketForm.className = 'modal-form';
  addTicketForm.innerHTML = `
        <div class="form-title">Удалить тикет</div>
        <form class="form">
            <div class="form-text">
                Вы уверены, что хотите удалить тикет? Это действие необратимо
            </div>
            <div class="button-row">
                <button class="cancel" type='button'>Отмена</button>
                <button class="ok" type='submit'>ok</button>
            </div>
        </form>`;
  body.append(addTicketForm);
  getDisable();
  document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    request('deleteTicket', target);
    addTicketForm.remove();
    setDisable();
  });
  document.querySelector('.cancel').addEventListener('click', () => {
    addTicketForm.remove();
    setDisable();
  });
}

function editFrom(target) {
  const addTicketForm = document.createElement('div');
  const nameValue = target.closest('.ticket-body').querySelector('.title').textContent;
  addTicketForm.className = 'modal-form';
  addTicketForm.innerHTML = `
            <form class="form">
                <div class="form-title">Редактировать тикет</div>
                <div class="form-row">
                    <label for="name">Краткое описание</label>
                    <input type="text" id='name' name='name' required value=${nameValue}>
                </div>
                <div class="form-row">
                    <label for="description">Подробное описание</label>
                    <textarea type="text" id='description' name='description'></textarea>
                </div>
                <div class="button-row">
                    <button class="cancel" type='button'>Отмена</button>
                    <button class="ok" type='submit'>ok</button>
                </div>
            </form>`;

  body.append(addTicketForm);
  getDisable();
  document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    request('createTicket', [...document.querySelector('form').elements], target);
    addTicketForm.remove();
    setDisable();
  });
  document.querySelector('.cancel').addEventListener('click', () => {
    addTicketForm.remove();
    setDisable();
  });
}

function checkTicket(target) {
  request('checkTicket', target.closest('.ticket'));
}

function buttonHandler(e) {
  const classes = e.target.classList;
  if (classes.contains('add-ticket-btn')) {
    const addTicketForm = document.createElement('div');
    addTicketForm.className = 'modal-form';
    addTicketForm.innerHTML = `
            <form class="form">
                <div class="form-title">Добавить тикет</div>
                <div class="form-row">
                    <label for="name">Краткое описание</label>
                    <input type="text" id='name' name='name' required>
                </div>
                <div class="form-row">
                    <label for="description">Подробное описание</label>
                    <textarea type="text" id='description' name='description'></textarea>
                </div>
                <div class="button-row">
                    <button class="cancel" type='button'>Отмена</button>
                    <button class="ok" type='submit'>ok</button>
                </div>
            </form>`;

    body.append(addTicketForm);
    getDisable();
    document.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      request('createTicket', [...document.querySelector('form').elements]);
      addTicketForm.remove();
      setDisable();
    });
    document.querySelector('.cancel').addEventListener('click', () => {
      addTicketForm.remove();
      setDisable();
    });
  } else if (classes.contains('edit')) {
    editFrom(e.target);
  } else if (classes.contains('delete')) {
    confirm(e.target);
  } else if (classes.contains('circle')) {
    checkTicket(e.target);
  } else if (classes.contains('ticket-body')) {
    request('ticketById', e.target.closest('.ticket'));
  }
}

function showTickets(data) {
  tickets.innerHTML = '';
  if (data) {
    data.forEach((element) => {
      const ticket = document.createElement('div');
      ticket.className = 'ticket';
      ticket.setAttribute('data-id', element.id);
      ticket.innerHTML = `<div class="ticket-body">
                <div class="circle btn">${element.status ? 'V' : ''}</div>
                <div class="title">${element.name}</div>
                <div class="date">
${new Date(parseInt(element.created, 10)).toLocaleString()}
</div>
                <div class="edit-block">
                    <div class="edit btn">R</div>
                    <div class="delete btn">X</div>
                </div>
                </div>
                <div class="ticket-description"></div>`;
      ticket.addEventListener('click', buttonHandler);
      tickets.append(ticket);
    });
  }
}

function showDescription(data, dataResponce) {
  const descriptionBlock = data.querySelector('.ticket-description');
  if (descriptionBlock.textContent) {
    descriptionBlock.textContent = '';
  } else {
    descriptionBlock.textContent = dataResponce.description;
  }
}

function showV(value) {
  const circle = value.querySelector('.circle');
  if (circle.textContent) {
    circle.textContent = '';
  } else {
    circle.textContent = 'V';
  }
}

export default function createRequest(method, data, target) {
  const params = new URLSearchParams();
  const xhr = new XMLHttpRequest(); // создание объекта
  if (method === 'createTicket') {
    const values = new URLSearchParams();
    data.filter(({ name }) => name)
      .forEach(({ name, value }) => values.append(name, value));
    data.filter(({ description }) => description)
      .forEach(({ description, value }) => values.append(description, value));
    params.append('method', method);
    values.append('status', '');
    values.append('created', Date.now());
    if (target) {
      values.append('id', target.closest('.ticket').dataset.id);
    }
    xhr.open('POST', `http://localhost:7070/?${params}`);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.addEventListener('load', () => {
      let dataResponce;
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          dataResponce = JSON.parse(xhr.responseText);
          showTickets(dataResponce);
        } catch (e) {
          console.error(e);
        }
      }
    });
    xhr.send(values);
  } else if (method === 'ticketById') {
    params.append('method', method);
    params.append('id', data.dataset.id);
    xhr.open('GET', `http://localhost:7070/?${params}`);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const dataResponce = JSON.parse(xhr.responseText);
          showDescription(data, dataResponce);
        } catch (e) {
          console.error(e);
        }
      }
    });
    xhr.send(); // отправка запроса
  } else if (method === 'deleteTicket') {
    params.append('method', method);
    params.append('id', data.closest('.ticket').dataset.id);
    xhr.open('GET', `http://localhost:7070/?${params}`);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.addEventListener('load', () => {
      let dataResponce;
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          dataResponce = JSON.parse(xhr.responseText);
          showTickets(dataResponce);
        } catch (e) {
          console.error(e);
        }
      }
    });
    xhr.send(); // отправка запроса
  } else if (method === 'checkTicket') {
    params.append('method', method);
    console.log(data, 'data');
    params.append('id', data.dataset.id);
    xhr.open('GET', `http://localhost:7070/?${params}`);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          // const dataResponce = JSON.parse(xhr.responseText);
          showV(data);
        } catch (e) {
          console.error(e);
        }
      }
    });
    xhr.send(); // отправка запроса
  } else {
    params.append('method', method);
    xhr.open('GET', `http://localhost:7070/?${params}`); // подготовка запроса
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.addEventListener('load', () => {
      let dataResponce;
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          dataResponce = JSON.parse(xhr.responseText);
          showTickets(dataResponce);
          console.log(dataResponce);
        } catch (e) {
          console.error(e);
        }
      }
    });
    xhr.send(); // отправка запроса
  }
}

addTicketBtn.addEventListener('click', buttonHandler);
