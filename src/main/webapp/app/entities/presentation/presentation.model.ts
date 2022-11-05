export interface IPresentation {
  id?: number;
}

export class Presentation implements IPresentation {
  constructor(public id?: number) {}
}

export function getPresentationIdentifier(presentation: IPresentation): number | undefined {
  return presentation.id;
}
