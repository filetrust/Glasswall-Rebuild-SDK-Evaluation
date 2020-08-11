The items in this directory have been added for unit test purposes. 

The Unit test module loads the Glasswall library and verifies that we are able to process each file in the test_data directory.

The directory contains:
	- test data
	- a copy of the glasswall classic library
	- a copy of the archive manager content management configuration file
	

Test App example usage
======================
The test application utilises the archive manager python wrapper to process a set of files in protect and analysis modes.
The test application has been tested on Python version 2.7.X and is untested on Python version 3.X
The regenerated files are stored in the specified output directory, and files are prefixed with the processing mode.

Example
=======
Run the following command or -h for help.

Linux
>> export LD_LIBRARY_PATH="./"
>> python TestApplication.py -i ./test_data -o ./test_app_output -c config.xml -l libglasswall.archive.manager.so

Windows
>> python TestApplication.py -i .\test_data -o .\test_app_output -c config.xml -l glasswall.archive.manager.dll