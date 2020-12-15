async function createRequest(method, data, target) {
  const params = new URLSearchParams();
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
    const response = await fetch(`http://localhost:7070/?${params}`, {
      method: 'POST',
      body: values,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.json(); // parses JSON response into native JavaScript objects
  } if (method === 'ticketById') {
    params.append('method', method);
    params.append('id', data.dataset.id);
    const response = await fetch(`http://localhost:7070?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.json(); // parses JSON response into native JavaScript objects
  } if (method === 'deleteTicket') {
    params.append('method', method);
    params.append('id', data.closest('.ticket').dataset.id);
    const response = await fetch(`http://localhost:7070?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.json(); // parses JSON response into native JavaScript objects
  } if (method === 'checkTicket') {
    params.append('method', method);
    params.append('id', data.dataset.id);
    const response = await fetch(`http://localhost:7070?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  params.append('method', method);
  const response = await fetch(`http://localhost:7070?${params}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

export default createRequest;
