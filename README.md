### Setup Cross Toolchain


Setups cross toolchain for cross compilation. This is mainly intented for kernels.  

This action will automatically deteced and use cached toolchains in the runner.

Supported toolchains.

- ARM GCC ARMHF 9.3 
- ARM GCC AARCH64 9.3



### Usage

In your workflows steps.
Don't miss the cache action.

```
    - uses: actions/checkout@v2
    - uses: actions/cache@v1
      with:
      path: ~/toolchains
      key: ${{ runner.os }}-tc
      restore-keys: |
      ${{ runner.os }}-tc-
    
    - name: Setup cross compiler toolchain
      uses: hexdev-io/action_setup-cross-tc@v1

```
