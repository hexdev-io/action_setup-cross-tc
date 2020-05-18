

import {getInputToolchains} from './main'
import {getInput}  from '@actions/core'
import { mocked } from 'ts-jest/utils'

jest.mock('@actions/core');

const mockedgetInput= mocked(getInput, true)

describe("getInputToolchains", () => {
  mockedgetInput.mockName('getInputMock') 
  const t_GccArm = 'gcc-arm'
  it(`It works when passed ${t_GccArm}`, () => { 
    const [input, expected ]= [ t_GccArm,[ t_GccArm]]
    mockedgetInput.mockReturnValueOnce(input) 
      expect(getInputToolchains() ).toEqual(expected)
  })

  it('It works when wehn passed empty string', () => {
    mockedgetInput.mockReturnValueOnce("") 
      expect(getInputToolchains() ).toEqual([])
  });

});

