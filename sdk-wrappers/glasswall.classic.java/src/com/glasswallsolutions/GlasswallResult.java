package com.glasswallsolutions;

/**
 * The result from a call made to the Glasswall library.
 */
public class GlasswallResult {
    /**
     * File status.
     */
    public final int fileStatus;

    /**
     * The analysis XML report.
     */
    public final String analysisReport;

    /**
     * The managed file buffer from calls made to Manage and Protect mode. This will be null if the file is non-conforming.
     */
    public final byte[] manageAndProtectBuffer;

    /**
     * The managed file buffer from calls made to Manage and Protect Lite mode. This will be null if the file is non-conforming.
     */
    public final byte[] manageAndProtectLiteBuffer;

    /**
     * The exported archive from calls made to export mode.
     */
    public final byte[] exportBuffer;

    /**
     * The import file buffer from calls made to Import mode. This will be null if the file is non-conforming.
     */
    public final byte[] importBuffer;

    /**
     * The engineering report log, which is only present in calls made to modes that produce an engineering log.
     */
    public final String reportLog;

    /**
     * The XML content management configuration from calls made to GWFileConfigGet. 
     */
    public final String xmlConfig;

    /**
     * The XML containing all the issue id ranges and descriptions from calls made to GWGetAllIdInfo.
     */
    public final String allIDInfo;

    /**
     * The issue description from calls made to GWGetIdInfo.
     */
    public final String idInfo;

    /**
     * The process status from calls made to GWFileProcessStatus
     */
    public final int processStatus;

    /**
     * The determined file type from calls made to Determine file type modes.
     */
    public final int determineFileType;

    public GlasswallResult()
    {
        fileStatus = 0;
        analysisReport = null;
        manageAndProtectBuffer = null;
        manageAndProtectLiteBuffer = null;
        exportBuffer = null;
        importBuffer = null;
        reportLog = null;
        xmlConfig = null;
        allIDInfo = null;
        idInfo = null;
        processStatus = 0;
        determineFileType = 0;
    }
}
