// import createRequest from './createRequest';

// const addTicketBtn = document.querySelector('.add-ticket-btn');

// const body = document.querySelector('body');

// function request(method, data, target) {
//   createRequest(method, data, target);
// }

// function getDisable() {
//   Array.from(document.querySelectorAll('.btn')).forEach((element) => {
//     const button = element;
//     button.disabled = true;
//     button.style.pointerEvents = 'none';
//   });
// }

// function setDisable() {
//   Array.from(document.querySelectorAll('.btn')).forEach((element) => {
//     const button = element;
//     button.disabled = false;
//     button.style.pointerEvents = 'auto';
//   });
// }

// function confirm(target) {
//   const addTicketForm = document.createElement('div');
//   addTicketForm.className = 'modal-form';
//   addTicketForm.innerHTML = `
//         <div class="form-title">Удалить тикет</div>
//         <form class="form">
//             <div class="form-text">
//                 Вы уверены, что хотите удалить тикет? Это действие необратимо
//             </div>
//             <div class="button-row">
//                 <button class="cancel" type='button'>Отмена</button>
//                 <button class="ok" type='submit'>ok</button>
//             </div>
//         </form>`;
//   body.append(addTicketForm);
//   getDisable();
//   document.querySelector('form').addEventListener('submit', (e) => {
//     e.preventDefault();
//     request('deleteTicket', target);
//     addTicketForm.remove();
//     setDisable();
//   });
//   document.querySelector('.cancel').addEventListener('click', () => {
//     addTicketForm.remove();
//     setDisable();
//   });
// }

// function editFrom(target) {
//   const addTicketForm = document.createElement('div');
//   const nameValue = target.closest('.ticket-body').querySelector('.title').textContent;
//   addTicketForm.className = 'modal-form';
//   addTicketForm.innerHTML = `
//             <form class="form">
//                 <div class="form-title">Редактировать тикет</div>
//                 <div class="form-row">
//                     <label for="name">Краткое описание</label>
//                     <input type="text" id='name' name='name' required value=${nameValue}>
//                 </div>
//                 <div class="form-row">
//                     <label for="description">Подробное описание</label>
//                     <textarea type="text" id='description' name='description'></textarea>
//                 </div>
//                 <div class="button-row">
//                     <button class="cancel" type='button'>Отмена</button>
//                     <button class="ok" type='submit'>ok</button>
//                 </div>
//             </form>`;

//   body.append(addTicketForm);
//   getDisable();
//   document.querySelector('form').addEventListener('submit', (e) => {
//     e.preventDefault();
//     request('createTicket', [...document.querySelector('form').elements], target);
//     addTicketForm.remove();
//     setDisable();
//   });
//   document.querySelector('.cancel').addEventListener('click', () => {
//     addTicketForm.remove();
//     setDisable();
//   });
// }

// function checkTicket(target) {
//   request('checkTicket', target.closest('.ticket'));
// }

// export default function buttonHandler(e) {
//   const classes = e.target.classList;
//   if (classes.contains('add-ticket-btn')) {
//     const addTicketForm = document.createElement('div');
//     addTicketForm.className = 'modal-form';
//     addTicketForm.innerHTML = `
//             <form class="form">
//                 <div class="form-title">Добавить тикет</div>
//                 <div class="form-row">
//                     <label for="name">Краткое описание</label>
//                     <input type="text" id='name' name='name' required>
//                 </div>
//                 <div class="form-row">
//                     <label for="description">Подробное описание</label>
//                     <textarea type="text" id='description' name='description'></textarea>
//                 </div>
//                 <div class="button-row">
//                     <button class="cancel" type='button'>Отмена</button>
//                     <button class="ok" type='submit'>ok</button>
//                 </div>
//             </form>`;

//     body.append(addTicketForm);
//     getDisable();
//     document.querySelector('form').addEventListener('submit', (evt) => {
//       evt.preventDefault();
//       request('createTicket', [...document.querySelector('form').elements]);
//       addTicketForm.remove();
//       setDisable();
//     });
//     document.querySelector('.cancel').addEventListener('click', () => {
//       addTicketForm.remove();
//       setDisable();
//     });
//   } else if (classes.contains('edit')) {
//     editFrom(e.target);
//   } else if (classes.contains('delete')) {
//     confirm(e.target);
//   } else if (classes.contains('circle')) {
//     checkTicket(e.target);
//   } else if (classes.contains('ticket-body')) {
//     request('ticketById', e.target.closest('.ticket'));
//   }
// }

// addTicketBtn.addEventListener('click', buttonHandler);
