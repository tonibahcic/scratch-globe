import * as THREE from "three";
import {flags} from "../Flags/flags";

interface CountryMaterial {
  code: string,
  material: THREE.MeshPhongMaterial
}

const createMaterials = (): CountryMaterial[] => {
  return flags.map(flag => {
    let urlMeta = "data:image/svg+xml;base64,"
    let builtUrl = urlMeta + flag?.svg ?? ""

    const material = new THREE.MeshPhongMaterial();
    material.bumpScale = 10;
    new THREE.TextureLoader().load(builtUrl, texture => {
      material.map = texture;
      material.specular = new THREE.Color('grey');
      material.shininess = 0;
    })
    return {
      code: flag.code,
      material: material
    } as CountryMaterial
  })
}

const materials = createMaterials();

export const getFlagCapMaterial = (code: string): THREE.MeshPhongMaterial => {
  return materials.find(cm => cm.code === code)?.material!
}
