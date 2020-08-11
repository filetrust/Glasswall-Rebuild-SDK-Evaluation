# Getting Started

### Ubuntu

There is a shell script for the Glasswall Rebuild SDK running on Ubuntu, configured to run files in Protect modes, please [Click Here](https://github.com/filetrust/Glasswall-Rebuild-SDK-Evaluation/blob/master/Getting-Started/Ubuntu_Classic.sh)

### Windows

We have the Glasswall Static File Analyzer to run the Glasswall Rebuild engine on Windows simply.

To run this you need to download the [Glasswall Static File Analyzer](https://github.com/filetrust/Glasswall-Rebuild-SDK-Evaluation/blob/master/Windows/Glasswall%20Static%20File%20Analyzer/Glasswall%20Static%20File%20Analyzer.exe), and the [Glasswall Rebuild Library](https://github.com/filetrust/Glasswall-Rebuild-SDK-Evaluation/blob/master/Windows/Library/glasswall.classic.dll), to the same folder. Running the Glasswall Static File Analyzer will create 2 config files, please do not remove or modify these files as these are set by the processing mode in the application itself

**Please note** - The Glasswall Static File Analyzer is an alpha application to quickly get started with using the Glasswall Rebuild engine. This does not have support for extended file types at this point in time, we would recommend using the CLI Tool to access all features

You can download the [CLI Tool](https://github.com/filetrust/Glasswall-Rebuild-SDK-Evaluation/blob/master/Windows/CLI/glasswall.classic.cli.exe) for use within Command Prompt

### Docker
This is built on a CentOS7 image, containing the Glasswall Rebuild engine. The engine is configured to run files in protect modes. File are processed from a mounted directory and regenerated into a separate output directory.
Begin by downloading the files to a clean workspace. Check that the dockerfile is in the same directory as the release package (The lib folder containing the Core library).

### Docker on Windows

If you haven’t used docker before you will need to install it now. You will need to share the drive you want to input and output data from with your instance of docker. To do this right click docker in the system tray. Click 'settings'. Click 'Shared Drives' and share the appropriate drive. Click 'Apply'.

To build the image open a PowerShell window in the dockerfile directory. Run the following command:
docker build -t *imageName*:0.1 .     (include the white space and trailing period)
This will produce a docker image with the configured *imageName*.

Before we run a container of the image lets create an input directory and an output directory, for instance:

•	C:\data\input – Place files to be processed here.

•	C:\data\output – Note that your output directory must be empty or Glasswall will fail to produce an output and will destroy any data present in there.

Now let’s mount the input and output directories and run a container of our image, using the following command:
docker run -it -v C:\data\input:/input -v C:\data\output:/output *imageName*:0.1

This command will build the container and mount "C:\data\input" to "/input" on the container and "C:\data\output" to "/output" and then immediately process the contents of "/input" and place the regenerated files and analysis reports in "/output".

A prebuilt Docker image is availible from: https://hub.docker.com/repository/docker/glasswallsolutions/evaluationsdk

### Tags
- :1 is Glasswall 1.X 
- :2 is Glasswall 2.X
