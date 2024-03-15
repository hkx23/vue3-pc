import { AndroidManifest, TagAttribute } from './androidManifest';
import { ResourceTable } from './resourceTable';

export default class AppInfo {
  manifest: AndroidManifest;

  resource: ResourceTable;

  constructor(manifest: ArrayBuffer, resource: ArrayBuffer) {
    this.manifest = new AndroidManifest(manifest);
    this.resource = new ResourceTable(resource);
  }

  public getPackage(): string {
    const attribute: TagAttribute = this.manifest.getTagAttribute('package');
    if (attribute) {
      if (attribute.type === TagAttribute.ATTR_STRING) {
        return this.manifest.getStringValue(attribute.valueString);
      }
      if (attribute.type === TagAttribute.ATTR_REFERENCE) {
        return this.resource.getResource(attribute.data);
      }
    }
    return '';
  }

  public getVersionCode(): number {
    const attribute: TagAttribute = this.manifest.getTagAttribute('versionCode');
    if (attribute) {
      if (attribute.type === TagAttribute.ATTR_INT) {
        return attribute.data;
      }
    }
    return 0;
  }

  public getVersionName(): string {
    const attribute: TagAttribute = this.manifest.getTagAttribute('versionName');
    if (attribute) {
      if (attribute.type === TagAttribute.ATTR_STRING) {
        return this.manifest.getStringValue(attribute.valueString);
      }
      if (attribute.type === TagAttribute.ATTR_REFERENCE) {
        return this.resource.getResource(attribute.data);
      }
    }
    return '';
  }

  public getLabel(): string {
    const attribute: TagAttribute = this.manifest.getLabelAttribute();
    if (attribute) {
      if (attribute.type === TagAttribute.ATTR_STRING) {
        return this.manifest.getStringValue(attribute.valueString);
      }
      if (attribute.type === TagAttribute.ATTR_REFERENCE) {
        return this.resource.getResource(attribute.data);
      }
    }
    return '';
  }
}
