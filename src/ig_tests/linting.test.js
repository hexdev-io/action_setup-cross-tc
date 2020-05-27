
import lintingConfig from "@hexdev/ts-linting"

test("It has env set up" , ()=> {
    expect(lintingConfig.env).not.toBeNull();
})