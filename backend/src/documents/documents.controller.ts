import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { DocumentsService } from './documents.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UploadDocumentDto } from './dto/upload-document.dto';

@ApiTags('documents')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload a document' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
        type: { type: 'string', enum: ['BLOOD_TEST', 'DNA_RAW_DATA', 'DNA_REPORT', 'IMAGING', 'LAB_RESULT', 'ANAMNESIS', 'CONSENT_FORM', 'OTHER'] },
        notes: { type: 'string' },
        patientId: { type: 'string' },
      },
    },
  })
  async upload(
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UploadDocumentDto,
  ) {
    return this.documentsService.upload(req.user.sub, file, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List current user documents' })
  async listMy(@Req() req) {
    return this.documentsService.listByUser(req.user.sub);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get document metadata' })
  async findOne(@Req() req, @Param('id') id: string) {
    return this.documentsService.findById(req.user.sub, id);
  }

  @Get(':id/download')
  @ApiOperation({ summary: 'Get document download URL' })
  async download(@Req() req, @Param('id') id: string) {
    return this.documentsService.getDownloadUrl(req.user.sub, id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a document' })
  async remove(@Req() req, @Param('id') id: string) {
    return this.documentsService.softDelete(req.user.sub, id);
  }
}
