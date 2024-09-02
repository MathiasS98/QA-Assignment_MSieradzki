export class StringConverters {
  /**
   * Remove special characters specific for some languages from a string.
   */
  static removeAccents(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
}
