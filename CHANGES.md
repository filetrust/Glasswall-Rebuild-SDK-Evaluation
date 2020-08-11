# Rebuild SDK Changes

All notable changes to this project will be documented in this file.

## [1.60] - 2020-04-14
### Fixes

58040 - Fixes for export mode crash for any filetype  
57834 - Fixes for a crash in exported mode on processing PDF files  
57763 - Import mode failure on exported files that are successfully processed in analysis and protect  
57191 - Fixed PDF memory leak.   
57134 - Fixed GIF memory leak.  
56865 - PDFs with signed content now correctly detected and not processed as this would invalidate the signature.  
57289 - Fixed no sanitisation id for "Internal Hyperlinks present in CT_MarkupRange" in DOCX files  
56885 - Fixed file failing with "End of stream 'numbering.xml' not reached" for DOCX  
55900 - Fixed acroforms being broken by Glasswall when all flags are set to allow  for PDF.  
56910 - Fixed “unexpected error - camera returned status(128)” on PNG files.  
57725 - DDE sanitised from DOCX in allow  
57701 - POIFS: Zero sector number was found  
56722 - XLSB: Xlsb files are currently passed to and handled by the xlsx camera which is corrupting them  
57699 - End of stream 'document.xml' not reached error for DOCX  
57605 - Processing PDF file generates stream error "Font file streams allowed maximum(800) exceeded"  
57682 - PPTX failure on import returning processDocumentObjectTree() returned status 0x000000B2, removing streams error  
57680 - Macros present in VBAInfoAtom.persitID error on import  
57684 - Import mode error failing with the following error message “ODRAW_VALIDATION_0289738104 Issue identified in embedded WMF file”  
57604 - Processing PDF file generates stream length error "exceeded the allowed maximum (16000000)"  
55823 - Glasswall is not applying content management to the doc file embedded within the ppt file  

### Changed

- Added content management switch to control image stream blanking in PDF export:-  
  A change made in previous versions to blank out image streams in pdf export was causing issues for some customers so this is now controllable. A new content management switch <retain_exported_stream>has been added to the options for PDF. When set to sanitise it will cause the image stream to be blanked out. For other values or if not provided, and then image streams will not be blanked out, i.e. as previous behaviour.

