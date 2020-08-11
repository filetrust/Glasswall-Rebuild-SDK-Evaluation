package com.glasswallsolutions;

import com.glasswallsolutions.Glasswall;
import com.glasswallsolutions.GlasswallResult;

/**
 * A Java API wrapper around the Glasswall library.
 */
public class Glasswall {
    static {
        System.loadLibrary("glasswall.classic.java");    // Java wrapper used to interact with the Glasswall library
    }

    /**************************************************************************************************
     * Configuration and Other function calls
     *************************************************************************************************/

    /**
     * Applies the given XML content management configuration to the Glasswall library.
     * @param xmlConfig The XML content management configuration.
     * @return A result indicating the status of the call.
     */
    public final static native GlasswallResult GWFileConfigXML(String xmlConfig);

    /**
     * Retrieves the current XML content management configuration from the Glasswall library.
     * @return A result indicating the status of the call along with the XML content management configuration.
     */
    public final static native GlasswallResult GWFileConfigGet();

    /**
     * Reverts the content management settings to their defaults, which are described in the Glasswall SDK documentation.
     * @return A result indicating the status of the call.
     */
    public final static native GlasswallResult GWFileConfigRevertToDefaults();

    /**
     * Retrieves the process status from the previous call made to Glasswall.
     * @return A result indicating the status of the call along with the process status.
     */
    public final static native GlasswallResult GWFileProcessStatus();

    /**
     * Retrieves the group description for the given Issue ID.
     * @param issueId The Issue ID to query.
     * @return A result indicating the status of the call along with the Issue ID group description.
     */
    public final static native GlasswallResult GWGetIdInfo(int issueId);

    /**
     * Retrieves the XML containing all the Issue ID ranges with their group descriptions.
     * @return A result indicating the status of the call along with all of the Issue ID information.
     */
    public final static native GlasswallResult GWGetAllIdInfo();

    /**
     * Returns a value indicating the file type determined by Glasswall.
     * @param inputFilePathName The file path to the input file.
     * @return A result indicating the determined file type.
     */
    public final static native GlasswallResult GWDetermineFileTypeFromFile(String inputFilePathName);

    /**
     * Returns a value indicating the file type determined by Glasswall along with the XML analysis report.
     * @param inputFilePathName The file path to the input file.
     * @return A result indicating the determined file type along with the XML analysis report.
     */
    public final static native GlasswallResult GWDetermineFileTypeFromFileAndReport(String inputFilePathName);

    /**
     * Returns a value indicating the file type determined by Glasswall.
     * @param inputFileBuffer The input buffer containing the file to be determined.
     * @return A result indicating the determined file type.
     */
    public final static native GlasswallResult GWDetermineFileTypeFromFileInMem(byte[] inputFileBuffer);

    /**
     * Returns a value indicating the file type determined by Glasswall along with the XML analysis report.
     * @param inputFileBuffer The input buffer containing the file to be determined.
     * @return A result indicating the determined file type along with the XML analysis report.
     */
    public final static native GlasswallResult GWDetermineFileTypeFromFileInMemAndReport(byte[] inputFileBuffer);

    /**
     * Releases any resources allocated by the Glasswall library. This is normally called once all the processing is done and Glasswall is not required anymore.
     * @return A result indicating the status of the call.
     */
    public final static native GlasswallResult GWFileDone();

    /**
     * Returns the Glasswall library version.
     * @return The Glasswall library version.
     */
    public final static native String GWFileVersion();

    /**
     * Returns the file process message from the previous call made to Glasswall.
     * @return The file process message.
     */
    public final static native String GWFileProcessMsg();

    /**
     * Returns the file error message from the previous call made to Glasswall.
     * @return The file error message.
     */
    public final static native String GWFileErrorMsg();

    /**************************************************************************************************
     * File to memory
     *************************************************************************************************/

    /**
     * Protects the file in File to Memory Protect Lite mode. The Managed Lite file buffer will be null if the file is non-conforming.
     * @param inputFilePathName The file path to the input file.
     * @param wcType The file type of the input file.
     * @return A result indicating the file process status along with the protected file.
     */
    public final static native GlasswallResult GWFileProtectLite(String inputFilePathName, String wcType);

    /**
     * Protects the file in File to Memory Protect mode. The Managed file buffer will be null if the file is non-conforming.
     * @param inputFilePathName The file path to the input file.
     * @param wcType The file type of the input file.
     * @return A result indicating the file process status along with the protected file.
     */
    public final static native GlasswallResult GWFileProtect(String inputFilePathName, String wcType);

    /**
     * Analyses the file in File to Memory Analysis mode.
     * @param inputFilePathName The file path to the input file.
     * @param wcType The file type of the input file.
     * @return A result indicating the file process status along with the XML analysis report.
     */
    public final static native GlasswallResult GWFileAnalysisAudit(String inputFilePathName, String wcType);

    /**************************************************************************************************
     * File to file
     *************************************************************************************************/

    /**
     * Protects the file in File to File Protect Lite mode. The managed file will not be created if the output directory does not exist or if the file is non-conforming.
     * @param inputFilePathName The file path to the input file.
     * @param wcType The file type of the input file.
     * @param outputFilePathName The output file path to the managed file.
     * @return A result indicating the file process status. 
     */
    public final static native GlasswallResult GWFileToFileProtectLite(String inputFilePathName, String wcType, String outputFilePathName);

    /**
     * Protects the file in File to File Protect mode. The managed file will not be created if the output directory does not exist or if the file is non-conforming.
     * @param inputFilePathName The file path to the input file.
     * @param wcType The file type of the input file.
     * @param outputFilePathName The output file path to the managed file.
     * @return A result indicating the file process status. 
     */
    public final static native GlasswallResult GWFileToFileProtect(String inputFilePathName, String wcType, String outputFilePathName);

    /**
     * Analyses the file in File to File Analysis mode. The analysis report will not be created if the output directory does not exist.
     * @param inputFilePathName The file path to the input file.
     * @param wcType The file type of the input file.
     * @param outputFilePathName The output file path to the XML analysis report.
     * @return A result indicating the file process status.
     */
    public final static native GlasswallResult GWFileToFileAnalysisAudit(String inputFilePathName, String wcType, String outputFilePathName);

    /**************************************************************************************************
     * Memory to Memory
     *************************************************************************************************/

     /**
      * Protects the file in Memory to Memory Protect mode. The managed file buffer will be null if the file is non-conforming.
      * @param inputFileBuffer The buffer containing the file to be processed.
      * @param wcType The file type of the input file.
      * @return A result indicating the file process status along with the protected file.
      */
     public final static native GlasswallResult GWMemoryToMemoryProtect(byte[] inputFileBuffer, String wcType);

     /**
      * Analyses the file in Memory to Memory Analysis mode.
      * @param inputFileBuffer The buffer containing the file to be analysed.
      * @param wcType The file type of the input file.
      * @return A result indicating the file process status along with the XML analysis report.
      */
     public final static native GlasswallResult GWMemoryToMemoryAnalysisAudit(byte[] inputFileBuffer, String wcType);

    /**************************************************************************************************
     * File to memory export and import
     *************************************************************************************************/

    /**
     * Imports the exported archive in File to Memory Import mode. The imported file will be null if the file is non-conforming.
     * @param inputFilePathName The file path to the exported file archive.
     * @return A result indicating the file process status along with the imported file.
     */
    public final static native GlasswallResult GWFileToMemoryProtectAndImport(String inputFilePathName);

    /**
     * Exports the file in File to Memory Export mode.
     * @param inputFilePathName The file path to the input file.
     * @return A result indicating the file process status along with the exported archive.
     */
    public final static native GlasswallResult GWFileToMemoryAnalysisProtectAndExport(String inputFilePathName);

    /**************************************************************************************************
     * File to file export and import
     *************************************************************************************************/

    /**
     * Imports the exported archive in File to File Import mode. The imported file will not be created if the output directory does not exist or the file is non-conforming.
     * @param inputFilePathName The file path to the exported file archive.
     * @param outputFilePathName The output file path to the imported file.
     * @return A result indicating the file process status.
     */
    public final static native GlasswallResult GWFileToFileProtectAndImport(String inputFilePathName, String outputFilePathName);

    /**
     * Exports the file in File to File Export mode. The exported archive will not be created if the output directory does not exist.
     * @param inputFilePathName The file path to the input file.
     * @param outputFilePathName The output file path to the exported archive. 
     * @return A result indicating the file process status.
     */
    public final static native GlasswallResult GWFileToFileAnalysisProtectAndExport(String inputFilePathName, String outputFilePathName);

    /**************************************************************************************************
     * File to memory with report
     *************************************************************************************************/

    /**
     * Protects the file in File to Memory Protect Lite with engineering report mode. The Managed Lite file buffer will be null if the file is non-conforming.
     * @param inputFilePathName The file path to the input file.
     * @param wcType The file type of the input file.
     * @return A result indicating the file process status along with the protected file and the engineering log.
     */
    public final static native GlasswallResult GWFileProtectLiteAndReport(String inputFilePathName, String wcType);

    /**
     * Protects the file in File to Memory Protect with engineering report mode. The Managed file buffer will be null if the file is non-conforming.
     * @param inputFilePathName The file path to the input file.
     * @param wcType The file type of the input file.
     * @return A result indicating the file process status along with the protected file and the engineering log.
     */
    public final static native GlasswallResult GWFileProtectAndReport(String inputFilePathName, String wcType);

    /**
     * Analyses the file in File to Memory Analysis with engineering report mode.
     * @param inputFilePathName The file path to the input file.
     * @param wcType The file type of the input file.
     * @return A result indicating the file process status along with the XML analysis report and the engineering log.
     */
    public final static native GlasswallResult GWFileAnalysisAuditAndReport(String inputFilePathName, String wcType);

    /**************************************************************************************************
     * File to file with report
     *************************************************************************************************/

    /**
     * Protects the file in File to File Protect Lite with engineering report mode. The managed file will not be created if the output directory does not exist or the file is non-conforming. The report will not be created if the output directory does not exist.
     * @param inputFilePathName The file path to the input file.
     * @param wcType The file type of the input file.
     * @param outputFilePathName The output file path to the managed file.
     * @param reportFilePathName The output file path to the engineering log.
     * @return A result indicating the file process status. 
     */
    public final static native GlasswallResult GWFileToFileProtectLiteAndReport(String inputFilePathName, String wcType, String outputFilePathName, String reportFilePathName);

    /**
     * Protects the file in File to File Protect with engineering report mode. The managed file will not be created if the output directory does not exist or the file is non-conforming. The report will not be created if the output directory does not exist.
     * @param inputFilePathName The file path to the input file.
     * @param wcType The file type of the input file.
     * @param outputFilePathName The output file path to the managed file.
     * @param reportFilePathName The output file path to the engineering log.
     * @return A result indicating the file process status. 
     */
    public final static native GlasswallResult GWFileToFileProtectAndReport(String inputFilePathName, String wcType, String outputFilePathName, String reportFilePathName);

    /**
     * Analyses the file in File to File Analysis with engineering report mode. The analysis report will not be created if the output directory does not exist.
     * @param inputFilePathName The file path to the input file.
     * @param wcType The file type of the input file.
     * @param outputFilePathName The file path to the output XML analysis report.
     * @param reportFilePathName The output file path to the engineering log.
     * @return A result indicating the file process status.
     */
    public final static native GlasswallResult GWFileToFileAnalysisAuditAndReport(String inputFilePathName, String wcType, String outputFilePathName, String reportFilePathName);
}
