import { Demo } from './Demo';
import { GLTF } from 'three-platformize/examples/jsm/loaders/GLTFLoader';
import { AmbientLight, Color, PointLight } from 'three-platformize';
import { MeshoptDecoder } from 'three-platformize/examples/jsm/libs/meshopt_decoder.module';

export class DemoMeshOpt extends Demo {
  async init(): Promise<void> {
    const { gltfLoader, camera, scene } = this.deps;
    gltfLoader.setMeshoptDecoder(MeshoptDecoder);

    const gltf = (await gltfLoader.loadAsync(
      'https://meshoptimizer.org/demo/pirate.glb',
    )) as GLTF;

    const pointLight = new PointLight(0xffffff, 0.8);
    pointLight.position.set(3, 3, 0);

    this.add(new AmbientLight(0xcccccc, 0.3));
    this.add(gltf.scene);
    this.add(camera);
    this.addCamera(pointLight);

    gltf.scene.position.y = -1;
    scene.position.z = 0;
    camera.position.y = 1.0;
    camera.position.z = 3.0;
    scene.background = new Color(0x300a24);

    this.addControl();
  }

  update(): void {
    this.orbitControl?.update();
  }

  dispose(): void {
    this.reset();
  }
}
