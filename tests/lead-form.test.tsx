import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../src/store/store';
const PublicLeadForm = require('../pages/publicLeadForm').default;

import handler from '../pages/api/leads';
import { NextApiRequest, NextApiResponse } from 'next';

describe('PublicLeadForm', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <PublicLeadForm />
      </Provider>
    );
  });

  test('should display error messages when fields are left empty on submission', async () => {

    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
  
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
  
    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledTimes(1);
      expect(alertMock).toHaveBeenCalledWith(
        'Missing required fields: First Name, Last Name, Email, LinkedIn / Personal Website URL, Country of Citizenship, Visa Categories, How can we help you?'
      );
    });
  

    alertMock.mockRestore();
  });

  test('should display validation error messages below required fields when left empty', async () => {
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
  
    await waitFor(() => {
      expect(screen.getAllByText('is a required property').length).toBe(6);
  
      // Check for each field individually except the dropdown
      expect(
        screen.getByLabelText('First Name *').parentElement?.nextSibling
      ).toHaveTextContent('is a required property');
  
      expect(
        screen.getByLabelText('Last Name *').parentElement?.nextSibling
      ).toHaveTextContent('is a required property');
  
      expect(
        screen.getByLabelText('Email *').parentElement?.nextSibling
      ).toHaveTextContent('is a required property');
  
      expect(
        screen.getByLabelText('LinkedIn / Personal Website URL *').parentElement?.nextSibling
      ).toHaveTextContent('is a required property');

      // Check if the error messages are displayed below the Visa Category field
      expect(
        screen.getByText('Visa categories of interest?')
          .parentElement?.parentElement?.querySelector('p')
      ).toHaveTextContent('is a required property');
    });
  });
});

const mockResponse = () => {
  const res: Partial<NextApiResponse> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as NextApiResponse;
};

describe('API /api/leads', () => {
  test('should return 200 and an empty array on GET request', async () => {
    const req = { method: 'GET' } as NextApiRequest;
    const res = mockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([]);
  });

  test('should return 201 and create a new lead on POST request', async () => {
    const req = {
      method: 'POST',
      body: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        countryOfCitizenship: 'USA',
      },
    } as NextApiRequest;

    const res = mockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        id: expect.any(Number),
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        countryOfCitizenship: 'USA',
        state: 'PENDING',
      })
    );
  });

  test('should return 400 for missing required fields', async () => {
    const req = {
      method: 'POST',
      body: {
        firstName: 'John',
      },
    } as NextApiRequest;

    const res = mockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Missing required fields',
    });
  });

  test('should return 405 for unsupported request methods', async () => {
    const req = { method: 'DELETE' } as NextApiRequest;
    const res = mockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({ error: 'Method not allowed' });
  });
});
