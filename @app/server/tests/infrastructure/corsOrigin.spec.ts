import { expect, jest, describe, beforeEach, afterEach, it } from '@jest/globals'

import { localHostDynamicOrigin } from '../../src/infrastructure/corsOrigin'

describe('localHostDynamicOrigin', () => {
  it('should call the callback with no error and origin set to true for valid localhost URLs', () => {
    const callback = jest.fn()

    localHostDynamicOrigin('http://localhost:3000', callback)

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith(null, true)
  })

  it('should call the callback with an error for non-localhost URLs', () => {
    const callback = jest.fn()

    localHostDynamicOrigin('https://example.com', callback)

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith(new Error('Not allowed by CORS'))
  })

  it('should call the callback with an error for undefined requestOrigin', () => {
    const callback = jest.fn()

    localHostDynamicOrigin(undefined, callback)

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith(new Error('Not allowed by CORS'))
  })
})
