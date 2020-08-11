import unittest
from GlasswallArchiveManager import ArchiveManager


class TestArchiveManagerMethods(unittest.TestCase):

    def setUp(self):
        self.gw = ArchiveManager("./test_artefacts/glasswall.archive.manager.dll")
        with open("./test_artefacts/test_data/test_file_001.zip", "rb") as f:
            self.input_file = f.read()

        with open("./test_artefacts/config.xml", "r") as f:
            self.config_file = f.read()

    def test_protect_status_success(self):
        ret_obj = self.gw.GwFileProtectAndReportArchive(self.input_file, self.config_file)
        print('----------------------------------------------------------------------')
        print(ret_obj.fileBuffer)
        print(ret_obj.reportBuffer)
        print('----------------------------------------------------------------------')
        self.assertEqual(ret_obj.returnStatus, 1)

    def test_analysis_status_success(self):
        ret_obj = self.gw.GwFileAnalysisArchive(self.input_file, self.config_file)
        print('----------------------------------------------------------------------')
        print(ret_obj.fileBuffer)
        print(ret_obj.reportBuffer)
        print('----------------------------------------------------------------------')
        self.assertEqual(ret_obj.returnStatus, 1)


suite = unittest.TestLoader().loadTestsFromTestCase(TestArchiveManagerMethods)
unittest.TextTestRunner(verbosity=2).run(suite)