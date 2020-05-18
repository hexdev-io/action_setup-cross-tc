### Setup Cross Toolchain


Setups cross toolchain for cross compilation. This is mainly intented for kernels.  

This action will automatically deteced and use cached toolchains in the runner.

Supported toolchains.

- ARM GCC ARMHF 9.3 
- ARM GCC AARCH64 9.3

### Installation 
Due to limitations of the Github Actions CI. 
You must setup the toolchain caches for now, with the default cache action.
And run the actual action as a step.

### Usage

In your workflows steps.

```
    - uses: actions/checkout@v2
    - uses: actions/cache@v1
      with:
      path: ~/toolchains
      key: ${{ runner.os }}-cross-tc
      restore-keys: |
      ${{ runner.os }}-cross-tc
    
    - name: Install cross compiler depedencies
      uses: hexdev-io/action_setup-cross-tc@v1

    - name: Setup cross compiler toolchains
      run:  python3 ~/toolchains/._toolchain.py

```
