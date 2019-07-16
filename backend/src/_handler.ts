import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda'

export const _handler = (
  fn: (event: APIGatewayProxyEvent) => Promise<any>
): APIGatewayProxyHandler => async (event: APIGatewayProxyEvent) => {
  try {
    const result = await fn(event)

    return {
      statusCode: result.status || 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(result),
    }
  } catch (err) {
    console.error(err)
    return {
      statusCode: err.status || 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        message: err.message,
      }),
    }
  }
}
