import createRequest from './createRequest';
import getDisable from './getDisable';
import setDisable from './setDisable';

const tickets = document.querySelector('.tickets');
const addTicketBtn = document.querySelector('.add-ticket-btn');
const body = document.querySelector('body');

function removeForm(addTicketForm) {
  document.querySelector('.cancel').addEventListener('click', () => {
    addTicketForm.remove();
    setDisable();
  });
}

function createForm() {
  const addTicketForm = document.createElement('div');
  addTicketForm.className = 'modal-form';
  return addTicketForm;
}

function addListener(ticket) {
  ticket.addEventListener('click', (e) => {
    const classes = e.target.classList;
    if (classes.contains('edit')) {
      editFrom(e.target);
    } else if (classes.contains('delete')) {
      confirm(e.target);
    } else if (classes.contains('circle')) {
      checkTicket(e.target);
    } else if (classes.contains('ticket-body')) {
      createRequest('ticketById', e.target.closest('.ticket')).then((response) => {
        showDescription(e.target.closest('.ticket'), response);
      });
    }
  });
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
      addListener(ticket);
      tickets.append(ticket);
    });
  }
}

function editFrom(target) {
  const addTicketForm = createForm();
  const nameValue = target.closest('.ticket-body').querySelector('.title').textContent;
  createRequest('ticketById', target.closest('.ticket'))
    .then((responce) => {
      addTicketForm.innerHTML = `
              <form class="form">
                  <div class="form-title">Редактировать тикет</div>
                  <div class="form-row">
                      <label for="name">Краткое описание</label>
                      <input type="text" id='name' name='name' required value=${nameValue}>
                  </div>
                  <div class="form-row">
                      <label for="description">Подробное описание</label>
                      <textarea type="text" id='description' name='description'>${responce.description}
                        </textarea>
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
        createRequest('createTicket', [...document.querySelector('form').elements], target).then((data) => {
          showTickets(data);
          addTicketForm.remove();
          setDisable();
        });
      });
      removeForm(addTicketForm);
    });
}

function confirm(target) {
  const addTicketForm = createForm();
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
    createRequest('deleteTicket', target).then((data) => {
      showTickets(data);
      addTicketForm.remove();
      setDisable();
    });
  });
  removeForm(addTicketForm);
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
  console.log(value);
  const circle = value.querySelector('.circle');
  if (circle.textContent) {
    circle.textContent = '';
  } else {
    circle.textContent = 'V';
  }
}

function checkTicket(target) {
  createRequest('checkTicket', target.closest('.ticket')).then(() => {
    showV(target.closest('.ticket'));
  });
}

createRequest('allTickets').then((data) => {
  showTickets(data);
});

function addTicket() {
  const addTicketForm = createForm();
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
    createRequest('createTicket', [...document.querySelector('form').elements]).then((data) => {
      showTickets(data);
      addTicketForm.remove();
      setDisable();
    });
  });
  removeForm(addTicketForm);
}

addTicketBtn.addEventListener('click', addTicket);
