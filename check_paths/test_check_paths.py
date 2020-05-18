
import unittest
import sys

import check_paths

env_path_base = "/usr/bin:/bin:/usr/sbin"
test_path = "/home/tools"

class TestSum(unittest.TestCase):
    def test_filter_env_path(self):
        """
        It returns empty on non toolchains path
        """
        env_path = env_path_base
        result = check_paths.filter_toolchain_path(env_path, test_path)
        self.assertEqual(result, [])

    def test_filter_env_path_base(self):
        """
        It returns paths on toolchains path
        """
        expect_path = "/home/tools/cat:/home/tools/woof"
        env_path = f"{expect_path}:{env_path_base}"
        result = check_paths.filter_toolchain_path(env_path, test_path)
        self.assertEqual(result, expect_path)

if __name__ == '__main__':
    unittest.main()  

